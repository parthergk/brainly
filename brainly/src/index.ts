import express, { NextFunction } from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import "dotenv/config";
import { z } from 'zod';
import cookieParser from "cookie-parser";

import { ContentModel, ShareLinkModel, TagModel, UserModel } from "./db/schema";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());


interface JwtPayload {
    userId: string
}

app.post("/brain/signup", async (req: Request, res: Response): Promise<any> => {
    const requiredBody = z.object({
        username: z.string().min(5),
        password: z.string().min(6),
    });
    const parsedBody = requiredBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid inputs", errors: parsedBody.error.errors });
    }

    const { username, password } = parsedBody.data;

    try {
        const existUser = await UserModel.findOne({ username: username });
        if (existUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await UserModel.create({ username: username, password: hashPassword });

        res.status(200).json({ message: "You are registered successfully" });
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ message: "Server-side error", error });
    }
});

app.post('/brain/signin', async (req: Request, res: Response): Promise<any> => {
    const requiredBody = z.object({
        username: z.string().min(5),
        password: z.string().min(6),
    });
    const parsedBody = requiredBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid inputs", errors: parsedBody.error.errors });
    }

    const { username, password } = parsedBody.data;
    try {
        const findUser = await UserModel.findOne({ username: username });
        if (!findUser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const hashPassword = bcrypt.compare(password, findUser?.password);
        if (!hashPassword) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        if (!process.env.JWT_SECRET) {
            return console.log("JWT_SECRET required");
        }

        const userId = findUser._id.toString();
        const token = jwt.sign({userId}, process.env.JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,       // Prevent access via JavaScript
            secure: true,         // Send only over HTTPS
            sameSite: 'strict',   // Prevent CSRF
        });
        res.status(200).json({ message: "You are login successfully" });
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ message: "Server-side error", error });
    }
});

const middelware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const tokenSchema = z.string(); // Validate that token is a string
    
    try {
        // Validate the presence of the token in cookies
        const parsedBody = tokenSchema.safeParse(req.cookies.token);
        if (!parsedBody.success) {
            return res.status(401).json({ message: "You are not logged in" });
        }

        const token = parsedBody.data;

        

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is required in environment variables.");
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        if (decoded) {
            console.log("decode",decoded);
            
            req.userID = decoded.userId; // Assuming the payload contains `userId`
            return next();
        }

        res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
        console.error("Token validation error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}



app.post('/brain/content', middelware, async (req, res): Promise<any> => {
    const userId = req.userID;
    console.log("userid", userId);
    
    const requiredBody = z.object({
        title: z.string(),
        url: z.string(),
        tags: z.array(z.string())
    });

    const parsedBody = requiredBody.safeParse(req.body);


    if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const { title, url, tags, } = parsedBody.data;

    const tagsArray = [];

    try {
        for (const tag of tags) {
            const findTag = await TagModel.findOneAndUpdate(
                { title: tag },
                { $setOnInsert: { title: tag } }, // Ensure the tag is set on insert
                { new: true, upsert: true }      // Create a new document if not found
            )
            tagsArray.push(findTag._id);
        }

        await ContentModel.create({
            url: url,
            title: title,
            userId: userId,
            tags: tagsArray
        })
        res.status(200).json({ message: "Content added successfully" });
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ message: "Server side error", error });
    }
});

app.get('/brain/content',middelware, async (req, res) => {
    const userId = req.userID;

    try {
        const allContent = await ContentModel.find({ userId: userId }).populate('userId', "username");
        res.status(200).json({ allContent });
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ message: "Server side error", error });
    }

});

app.delete('/brain/content', middelware, async (req, res):Promise<any> => {
    const userID = req.userID;
    const requiredBody = z.object({
        contentId: z.string()
    });
    const parsedBody = requiredBody.safeParse(req.body);
    
    if (!parsedBody.success) {
        return res.status(400).json({ message: "Content ID is required" });
    }
    
    const { contentId } = parsedBody.data;
    

    if (!contentId) {
        res.status(400).json({ message: "content id is required" });
    }

    try {
        await ContentModel.deleteOne({ _id: contentId, userId: userID });
        res.status(200).json({ message: "Your content deleted successfully" });
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ message: "Server side error", error });
    }
})

app.post('/brain/share', middelware, async (req, res) => {
    const { share } = req.body;
    const userID = req.userID;
    

    try {
        if (share) {
            const existingLink = await ShareLinkModel.findOne({ userId: userID });
            if (existingLink) {
                res.status(200).json({ hash: existingLink.hash });
                return;
            }

            const hash = await bcrypt.hash('iloveyouswati', 10);

            const shareLink = await ShareLinkModel.create({ userId: userID, hash: hash });
            res.status(200).json({ hash: shareLink.hash });
        }
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ message: "Server side error", error });
    }
});

app.get('/brain/share', middelware, async (req, res): Promise<any> => {
    const requiredBody = z.object({
        sharelink: z.string()
    });
    const parsedBody = requiredBody.safeParse(req.body);
    
    if (!parsedBody.success) {
        return res.status(400).json({ message: "Invalid share link" });
    }
    
    const { sharelink } = parsedBody.data;
    

    try {
        const link = await ShareLinkModel.findOne({ hash: sharelink });

        if (!link) {
            return res.status(400).json({ messagee: "invalid link" });
        }

        const content = await ContentModel.find({ userId: link.userId })

        res.status(200).json({ content })
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ message: "Server side error", error });
    }
})


async function main() {
    if (!process.env.DB_URI) {
        return console.log("db uri not corrected");
    };

    await mongoose.connect(process.env.DB_URI);

    app.listen(port, () => {
        console.log(`server is runing on http://localhost:${port}`);
    });
}

main();
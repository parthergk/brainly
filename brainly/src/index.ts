import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import "dotenv/config";
import { z } from 'zod';
import { ContentModel, TagtModel, UserModel } from "../db/schema";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

interface JwtPayload {
    userId: string
}

app.post("/signup", async (req: Request, res: Response): Promise<any> => {
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

app.post('/signin', async (req: Request, res: Response): Promise<any> => {
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
        const token = jwt.sign(userId, process.env.JWT_SECRET);

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

app.use((req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(400).json({ message: "You are not login" });
    }

    if (!process.env.JWT_SECRET) {
        return console.log("JWT_SECRET required");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        if (decoded) {
            req.userID = decoded.userId;
            next();
        }
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(400).json({ message: "Invalid token" });
    }


})



app.post('/content', async (req, res): Promise<any> => {
    const userId = req.userID;
    const { title, url, tags, } = req.body;
    if (!Array.isArray(tags) || !title || !url) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    const tagsArray = [];

    try {
        for (const tag of tags) {
            const findTag = await TagtModel.findOneAndUpdate(
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

app.get('/content', async (req, res) => {
    const userId = req.userID;

    try {
        const allContent = await ContentModel.find({ userId: userId });
        res.status(200).json({allContent});
    } catch (error) {
        console.error("Server-side error:", error);
        res.status(500).json({ message: "Server side error", error });
    }

});



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
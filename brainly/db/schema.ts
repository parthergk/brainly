import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

export const UserModel = mongoose.model('User', useSchema);

const contentSchema = new mongoose.Schema({
    userId : {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    url : {type: String, required: true},
    title: {type: String, required: true},
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
});

export const ContentModel = mongoose.model('Content', contentSchema);

const tagSchema = new mongoose.Schema({
    title: {type: String}
})

export const TagtModel = mongoose.model('Tag', tagSchema);
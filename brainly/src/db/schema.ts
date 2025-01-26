import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

export const UserModel = mongoose.model('User', useSchema);

const contentType = ['youtube', 'twitter'];

const contentSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    type: {type:String, enum:contentType, required: true},
    url: {type: String, required: true},
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
});

export const ContentModel = mongoose.model('Content', contentSchema);

const tagSchema = new mongoose.Schema({
    title: {type: String}
})

export const TagModel = mongoose.model('Tag', tagSchema);

const shareLinkSchema = new mongoose.Schema({
  hash: {type: String, required: true},
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

export const ShareLinkModel = mongoose.model('ShareLink', shareLinkSchema);
import mongoose from "mongoose";

const postModel = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    task:{
        type: String,
        required: true
    },
    date:{
        type:String,
        required:true
    }
})

const Post = mongoose.model("Post", postModel);

export default Post;
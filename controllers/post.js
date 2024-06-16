import Post from "../models/postModel.js";

export const postTask = async (req, res) => {
    try {
        const { userId, task, date} = req.body;
        const newPost = new Post({
            userId,
            task,
            date
        })

        await newPost.save();
        const post = await Post.find({userId});
        res.json({post,message:'Task added successfully'})

    } catch (error) {
        res.json({error:error.message})
    }
}

export const getTasks = async (req, res) => {
    try {
        const { userId } = req.query;
        const post = await Post.find({userId:userId});
        res.json(post)
    } catch (error) {
        res.json({error:error.message})
    }
}

export const deleteTask = async (req, res) =>{
    try {
        const { taskId, userId } = req.query;

        const deleteTask = await Post.findByIdAndDelete({_id:taskId});

        if(!deleteTask){
            res.json({error:'Task not found'});
        }

        const posts = await Post.find({userId});
        res.json({posts,message:'Deleted Successfully'});
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async (req, res) =>{
    const {taskId, newText, userId} = req.body;
    try {
        const taskUpdate = await Post.findByIdAndUpdate({_id:taskId},{task:newText})
        if(!taskUpdate){
            res.json({error:'Task not found'})
        }
        
        const posts = await Post.find({userId});
        res.json({posts,message:'Successfully Updated'})
    } catch (error) {
        console.log(error)
    }
}
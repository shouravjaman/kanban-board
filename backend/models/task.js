import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:["todo","doing","done"],
        default:"todo"
    }
});
export const Task=mongoose.model("Task",taskSchema)
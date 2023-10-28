import mongoose from "mongoose";

export class User {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id; 
        this.name = name; 
        this.email = email;
    }
}


export const UserSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    name :{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
    }
});






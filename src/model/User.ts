import mongoose, { Schema, Document } from "mongoose";


//Defining datatype with help of iinterface named Message or ye sab mongoose ke document ka part hoga that's why we use extends Document.


export interface Message extends Document {
    content: string; //In TypeScript string starts with small "s"
    createdAt: Date
}

//Ek schema follow karega jiska ek custom datatype hai Schema<Message>
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    varifyCode: string;
    varifyCodeExpiry: Date;
    isVarified: boolean
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    varifyCode: {
        type: String,
        required: [true, "Varify Code is required"],
    },
    varifyCodeExpiry: {
        type: Date,
        required: [true, "Varify Code Expiry is required"],
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

//"as mongoose.Model<User>" hamara jo return datatype aane wala hai wo mongoose .Model datatype ka ayega or wo USer ke type ka hoga.

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel
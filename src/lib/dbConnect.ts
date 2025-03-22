import { log } from "console";
import mongoose from "mongoose";

//Database se connection ke baad jo object mujhe mil raha hai usme kya value honi chahiye or uska type kya hai
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

//mujhe nahi pata promise kya return karega issiliye VOID
async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to Database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")

        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully")
    } catch (error) {

        console.log("Database Connection Failed", error)
        process.exit(1)
    }
}

export default dbConnect;
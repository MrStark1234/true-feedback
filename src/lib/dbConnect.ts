
import mongoose from "mongoose";

//Database se connection ke baad jo object mujhe mil raha hai usme kya value honi chahiye or uska type kya hai
type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

// /**
//  * Establishes a connection to the database using Mongoose.
//  * 
//  * This function checks if there is already an active connection to the database.
//  * If a connection exists, it logs a message and returns early. If not, it attempts
//  * to connect to the database using the URI specified in the environment variable
//  * MONGO_URI. Upon a successful connection, it updates the connection status and
//  * logs a success message. In case of an error during the connection attempt,
//  * it logs the error and exits the process with a failure status.
//  * 
//  * @returns {Promise<void>} A promise that resolves when the connection attempt is complete.
//  */


//mujhe nahi pata promise kya return karega issiliye VOID
async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to Database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")


        // The isConnected number returned will be found in the readState of the first element
        // of the connections array within the db object. This is only for type safety.
        connection.isConnected = db.connections[0].readyState

        console.log("DB Connected Successfully")
    } catch (error) {

        console.log("Database Connection Failed", error)
        process.exit(1)
    }
}

export default dbConnect;
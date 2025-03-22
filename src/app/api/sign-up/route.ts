import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVarificationEmail } from "@/helpers/sendVarificationEmail";


export async function POST(request: Request) {
    await dbConnect()

    try {
        const { username, email, password } = await request.json()
        const existingUserVarifiedByUsername = await UserModel.findOne({
            username, isVarified: true
        })

        if (existingUserVarifiedByUsername) {
            return Response.json({
                success: false, message: "Username is already taken"
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email })
        const varifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if (existingUserByEmail) {
            if (existingUserByEmail.isVarified) {
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                }, {
                    status: 400
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.varifyCode = varifyCode
                existingUserByEmail.varifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                varifyCode,
                varifyCodeExpiry: expiryDate,
                isVarified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save()
        }

        //Send Varification Email
        const emailResponse = await sendVarificationEmail(email, username, varifyCode)

        if (!emailResponse) {
            return Response.json({
                success: false,
                message: "Error occured in sending varification code"
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "User Registered Successfully, Please varify your email"
        }, { status: 200 })
    } catch (error) {
        console.error("Error registering error", error)
        return Response.json({ success: false, message: "Error registering user" }, { status: 500 })
    }
}
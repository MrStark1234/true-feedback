import { resend } from '@/lib/resend'
import VerificationEmail from '../../emails/VarificatonEmail'
import { ApiResponse } from '@/types/ApiResponse'
import { any } from 'zod'

export async function sendVarificationEmail(
    email: string,
    username: string,
    varifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "True Feedback: Varification Code",
            react: VerificationEmail({ username, otp: varifyCode }),
        });
        return { success: true, message: "Varification email send successfully" }
    } catch (emailError) {
        console.error("Error sending varification email", emailError)
        return { success: false, message: "Failed to send varification email" }
    }
}
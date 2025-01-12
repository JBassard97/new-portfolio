import { NextResponse } from "next/server";
import emailjs from "emailjs-com";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        try {
            const response = await emailjs.send(
                process.env.EMAILJS_SERVICE_ID!,
                process.env.EMAILJS_TEMPLATE_ID!,
                { name, email, message },
                process.env.EMAILJS_USER_ID!
            );

            return NextResponse.json({ message: "Email sent successfully!", response });
        } catch (error: any) {
            console.error("EmailJS Error:", error);
            return NextResponse.json(
                {
                    message: "Failed to send email",
                    error: error.text || error.message || "Unknown error",
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }
}

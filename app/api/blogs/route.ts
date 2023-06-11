import connectDB from "@/app/mongodb/config/db";
import Blog from "@/app/mongodb/models/Blog";
import { NextResponse } from "next/server";

export async function GET(
    request: Request
) {
    try {
        await connectDB();
        const blogs = await Blog.find({});

        return NextResponse.json(blogs);
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 404 });
    }
}
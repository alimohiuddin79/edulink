import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/app/mongodb/config/db";
import Blog from "@/app/mongodb/models/Blog";

interface IParams {
  userId?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const { userId } = params;
    await connectDB();
    const blogs = await Blog.find({ authorId: userId });

    if (!blogs) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(blogs);
  } catch (error: any) {
    console.log(error, "BLOG ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}

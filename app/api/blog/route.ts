import getCurrentUser from "@/app/actions/getCurrentUser";
import connectDB from "@/app/mongodb/config/db";
import Blog from "@/app/mongodb/models/Blog";
import { NextResponse } from "next/server";
import _ from "lodash";

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

export async function POST(
    request: Request,
    // { params }: { params: IParams }
) {
    const body = await request.json();
    const { title, content, tags, img } = body;
    try {
        await connectDB();
        const currentUser = await getCurrentUser();
        console.log(currentUser);
        

        // const { userId } = params;

        if(!currentUser?._id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if(currentUser?.type === 'student') {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if(currentUser?.type === 'counselor' || currentUser?.type === 'admin' || currentUser?.admin) {
            const newBlog = await Blog.create({
                title: _.startCase(_.toLower(title)),
                authorId: currentUser._id,
                authorName: currentUser.name,
                content,
                tags: tags === undefined ? [] : tags,
                img
            });

            return new NextResponse('Blog created', { status: 201 });
        }
    } catch (error: any) {
        console.log(error, 'BLOG ERROR');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
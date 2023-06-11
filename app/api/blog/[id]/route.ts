import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse, NextRequest } from "next/server";

import _ from "lodash";
import connectDB from "@/app/mongodb/config/db";
import Blog from "@/app/mongodb/models/Blog";

interface IParams {
    id?: string;
}

export async function GET(
    request: NextRequest,
    { params }: { params: IParams }
) {
    try {
            const { id } = params;
            await connectDB();
            const blog = await Blog.findById(id);
            // console.log(id);
            

            if(!blog) {
                return new NextResponse('Not Found', { status: 404 });
            } 
            return NextResponse.json(blog);
        }
    catch (error: any) {
        console.log(error, 'BLOG ERROR');
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: IParams }
) {
    try {
            const { id } = params;
            const body = await request.json();

            await connectDB();

            const currentUser = await getCurrentUser();

            if (currentUser.type === 'counselor' || currentUser.type === 'admin') {
                const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: body });

                if (updatedBlog) {
                    return NextResponse.json(updatedBlog);
                } else {
                    return new NextResponse('Not Found', { status: 404 });
                }
            } else {
                return new NextResponse('Unauthorized', { status: 401 });
            }
        }
    catch (error: any) {
        console.log(error, 'BLOG ERROR');
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: IParams }
) {
    try {
            const { id } = params;
            await connectDB();

            const currentUser = await getCurrentUser();

            if (currentUser.type === 'counselor' || currentUser.type === 'admin') {
                const deleteBlogStatus = await Blog.findByIdAndRemove(id);

                if (deleteBlogStatus) {
                    return NextResponse.json(deleteBlogStatus);
                } else {
                    return new NextResponse('Not Found', { status: 404 });
                }
            } else {
                return new NextResponse('Unauthorized', { status: 401 });
            }
        }
    catch (error: any) {
        console.log(error, 'BLOG ERROR');
        return new NextResponse('Internal Error', { status: 500 });
    }
}

// export async function POST(
//     request: Request,
//     // { params }: { params: IParams }
// ) {
//     const body = await request.json();
//     const { title, content, tags, img } = body;
//     try {
//         await connectDB();
//         const currentUser = await getCurrentUser();
//         console.log(currentUser);
        

//         // const { userId } = params;

//         if(!currentUser?._id || !currentUser?.email) {
//             return new NextResponse('Unauthorized', { status: 401 });
//         }

//         if(currentUser?.type === 'student') {
//             return new NextResponse('Unauthorized', { status: 401 });
//         }

//         if(currentUser?.type === 'counselor' || currentUser?.type === 'admin' || currentUser?.admin) {
//             const newBlog = await Blog.create({
//                 title: _.startCase(_.toLower(title)),
//                 authorId: currentUser._id,
//                 authorName: currentUser.name,
//                 content,
//                 tags: tags === undefined ? [] : tags,
//                 img
//             });

//             return new NextResponse('Blog created', { status: 201 });
//         }
//     } catch (error: any) {
//         console.log(error, 'BLOG ERROR');
//         return new NextResponse('Internal Error', { status: 500 });
//     }
// }
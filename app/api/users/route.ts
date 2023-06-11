import getCurrentUser from "@/app/actions/getCurrentUser";
import connectDB from "@/app/mongodb/config/db";
import User from "@/app/mongodb/models/User";
import { NextResponse } from "next/server";

export async function GET(
    request: Request
) {
    try {
        await connectDB();
        const currentUser = await getCurrentUser();

        if(currentUser?.type === 'admin' && currentUser?.admin === true) {
            const users = await User.find({ type: { $in: ['student', 'counselor'] } }).select('-password');

            if(users) {
                return NextResponse.json(users);
            } else {
                return new NextResponse('Users not found', { status: 404 });
            }
        } else {
            return new NextResponse('Unauthorized', { status: 401 });
        }
    } catch (error: any) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 404 });
    }
}
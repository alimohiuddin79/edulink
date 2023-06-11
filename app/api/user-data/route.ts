import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import _ from "lodash";

export async function GET(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        if(currentUser){
            return NextResponse.json(currentUser);
        } else {
            return new NextResponse('Unauthorized', { status: 401 });
        }

    } catch (error: any) {
        console.log(error);
        return new NextResponse('Internal Error', { status: 404 });
    }
}

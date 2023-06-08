import bcrypt from "bcrypt";
import _ from "lodash";

import connectDB from "@/app/mongodb/config/db";
import User from "@/app/mongodb/models/User";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    try {
        await connectDB();
        const body = await request.json();

        const {
            name,
            email,
            password,
            type,
            phoneNumber,
            gender,
            dob
        } = body;

        if (!email || !name ||!password || !type || !phoneNumber || !gender || !dob) {
            return new NextResponse('Missing info', { status: 400 });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return new NextResponse('User already exists', { status: 409 })
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name: _.startCase(_.toLower(name)),
            email,
            password: hashPassword,
            phoneNumber,
            type,
            gender,
            dob
        });

        return NextResponse.json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error: any) {
        console.log(error, 'REGISTRATION ERROR');
        return new NextResponse('Internal Error', { status: 500 });
    }
}
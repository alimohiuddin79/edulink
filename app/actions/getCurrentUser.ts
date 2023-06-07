import connectDB from "../mongodb/config/db";
import User from "../mongodb/models/User";

import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await User.findOne({ email: session.user.email as string }).select('-password');

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}

export default getCurrentUser;
import { getAuth, clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const { isAuthenticated, userId } = getAuth(req);

        console.log("isAuthenticated:", isAuthenticated);


        if (!isAuthenticated || !userId) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated"
            });
        }

        const user = await clerkClient.users.getUser(userId);

        const free_usage = user.privateMetadata?.free_usage || 0;

        req.free_usage = free_usage;

        const plan = user.publicMetadata?.plan || user.privateMetadata?.plan || "free";

        req.plan = plan;

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

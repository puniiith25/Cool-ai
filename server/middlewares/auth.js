<<<<<<< HEAD
import { getAuth, clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const { isAuthenticated, userId } = getAuth(req);

        console.log("isAuthenticated:", isAuthenticated);
        console.log("userId:", userId);

        if (!isAuthenticated || !userId) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated"
            });
        }

        const user = await clerkClient.users.getUser(userId);

        const free_usage = user.privateMetadata?.free_usage || 0;

        req.free_usage = free_usage;

        // For now, test without billing/plan logic
        req.plan = "free";

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
=======




// Middleware to check userID and hassPremiumPlan

import { clerkClient } from "@clerk/express";

export const auth =async (req ,res ,next) =>{
    try {
        const {userID ,has} = await req.auth();
        const hasPremiumPlan = await has({plan:'premium'});
        const user = await clerkClient.users.getUser(userID);
        if(!hasPremiumPlan && user.privateMetadata.free_usage){
            res.free_usage = user.privateMetadata.free_usage
        }
        else{
            await clerkClient.users.updateUserMetadata(userID,{
                privateMetadata:{
                    free_usage:0
                }
            })
            req.free_usage =0;
        }
        req.plan = hasPremiumPlan ?'premium':'free';
        next()
    } catch (error) {
        res.json({success:false ,message:error.message})
        
    }

}
>>>>>>> origin/main

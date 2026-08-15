import sql from "../configs/database.js";

export const getUserCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const creations = await sql`select * from creations where user_id = ${userId} order by created_at desc`
        res.json({ success: true, creations })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getPublishShedCreation = async (req, res) => {
    try {

        const creations = await sql`select * from creations where publish = true order by created_at desc`
        res.json({ success: true, creations })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { id } = req.body;
        const [creations] = await sql`select * from creations where id = ${id} `

        if (!creations) {
            return res.json({ success: false, message: "Creation not found" })


        }

        const currentLikes = creations.likes;
        const userIdstr = userId.toString();
        let updatedLikes = userId;
        let message;
        if (currentLikes.includes(userIdstr)) {
            updatedLikes = currentLikes.filter((user) => user !== userIdstr);
            message = "Creation unLiked"
        }
        else {
            updatedLikes = [...currentLikes, userIdstr]
            message: 'Creation liked'
        }
        const formattedArray = `{${updatedLikes.join(',')}}`
        await sql`update creations set likes = ${formattedArray}::text[] where id = ${id}`
        res.json({ success: true, message })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

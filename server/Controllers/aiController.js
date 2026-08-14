import { OpenAI } from "openai";
import sql from "../configs/database.js";
import { clerkClient } from "@clerk/express";
<<<<<<< HEAD

const AI = new OpenAI({
    apiKey: process.env.gemini_api_key,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();

        console.log("CONTROLLER USER ID:", userId);

        const { prompt, length } = req.body;

        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Limit reached. Upgrade to continue"
            });
        }

=======
const AI = new OpenAI({
    apiKey: process.env.grmini_api_key,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
})
export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.body;
        const free_usage = req.free_usage;
        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue" })
        }
>>>>>>> origin/main
        const response = await AI.chat.completions.create({
            model: "gemini-3.6-flash",
            messages: [
                {
                    role: "user",
                    content: prompt
<<<<<<< HEAD
                }
=======
                },


>>>>>>> origin/main
            ],
            temperature: 0.7,
            max_completion_tokens: length
        });
<<<<<<< HEAD

        const content = response.choices[0].message.content;

        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type)
            VALUES
            (${userId}, ${prompt}, ${content}, 'article')
        `;

        if (plan !== "premium") {
=======
        const content = response.choices[0].message.content

        await sql`INSERT INTO creations (user_id,prompt,content,type) VALUES (${userId},${prompt},${content},'article')`
        if (plan !== 'premium') {
>>>>>>> origin/main
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
<<<<<<< HEAD
            });
        }

        return res.json({
            success: true,
            content
        });

    } catch (error) {
        console.log("ARTICLE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

=======
            })
        }

        res.json({ success: true, content })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
>>>>>>> origin/main

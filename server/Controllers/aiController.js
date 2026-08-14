import { OpenAI } from "openai";
import sql from "../configs/database.js";
import { clerkClient } from "@clerk/express";
import axios from 'axios'
import { v2 as cloudinary } from 'cloudinary'
import connectCloudinary from "../configs/cloudinary.js";
import { PDFParse } from "pdf-parse";
import fs from 'fs'
const AI = new OpenAI({
    apiKey: process.env.gemini_api_key,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();


        const { prompt, length } = req.body;

        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Limit reached. Upgrade to continue"
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-3.6-flash",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_completion_tokens: length
        });

        const content = response.choices[0].message.content;

        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type)
            VALUES
            (${userId}, ${prompt}, ${content}, 'article')
        `;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
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



export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();

        const { prompt, length } = req.body;

        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({
                success: false,
                message: "Limit reached. Upgrade to continue"
            });
        }

        const response = await AI.chat.completions.create({
            model: "gemini-3.6-flash",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_completion_tokens: 100
        });

        const content = response.choices[0].message.content;

        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type)
            VALUES
            (${userId}, ${prompt}, ${content}, 'blog-title')
        `;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
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

export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();

        const { prompt, publish } = req.body;

        const plan = req.plan;


        if (plan == "premium") {
            return res.json({
                success: false,
                message: "only For Premium user"
            });
        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: { 'x-api-key': process.env.CLIPDROP_API_KEY, },
            responseType: "arraybuffer"
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString}`
        const { secure_url } = await cloudinary.uploader.upload(base64Image)


        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type,publish)
            VALUES
            (${userId}, ${prompt}, ${secure_url}, 'image',${publish ?? false})
        `;

        return res.json({
            success: true,
            content: secure_url
        });

    } catch (error) {
        console.log("ARTICLE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();

        const { object } = req.body;
        const { image } = req.file;

        const plan = req.plan;


        if (plan !== "premium") {
            return res.json({
                success: false,
                message: "Only premium users can use this feature"
            });
        }



        const { secure_url } = await cloudinary.uploader.upload(image.path)
        const image_url = await cloudinary.url(secure_url, {
            transformation: [{ effect: `gen_remove:${object}` }],
            resource_type: 'image'
        })

        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type)
            VALUES
            (${userId}, 'Remove ${object} from image', ${image_url}, 'image')
        `;

        return res.json({
            success: true,
            content: image_url
        });

    } catch (error) {
        console.log("ARTICLE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();

        const { image } = req.file;

        const plan = req.plan;


        if (plan == "premium") {
            return res.json({
                success: false,
                message: "only For Premium user"
            });
        }



        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [{
                effect: 'backgroung_removal',
                background_removal: 'remove_the_background'
            }]
        })


        await sql`
            INSERT INTO creations
            (user_id, prompt, content, type)
            VALUES
            (${userId}, 'Remove background from image', ${secure_url}, 'image')
        `;

        return res.json({
            success: true,
            content: secure_url
        });

    } catch (error) {
        console.log("ARTICLE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();

        const { resume } = req.file;

        const plan = req.plan;


        if (plan == "premium") {
            return res.json({
                success: false,
                message: "only For Premium user"
            });
        }



        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: "Resume file zise shoud be below 5MB" })
        }
        const dataBufffer = fs.readFileSync(resume.path)
        const pdfdata = await PDFParse(dataBufffer)

        const prompt = `Review the following resume and provide constructive feedback on its strenth , weaknesses , and areas for improvent.${pdfdata.text}`

        const response = await AI.chat.completions.create({
            model: "gemini-3.6-flash",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_completion_tokens: 1000
        });

        const content = response.choices[0].message.content;
        await sql`
    INSERT INTO creations
    (user_id, prompt, content, type)
    VALUES
    (${userId}, ${"Review the uploaded resume"}, ${content}, 'resume-review')
`;

        return res.json({
            success: true,
            content: content
        });

    } catch (error) {
        console.log("ARTICLE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
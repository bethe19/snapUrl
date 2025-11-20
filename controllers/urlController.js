import Url from "../models/Url.js";
import shortid from "shortid";
export const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;
    if(!originalUrl){ 
        return res.status(400).json({
            status:"failed",
            message:"Url required"
        })
    }

    try{
        const url = new Url({ originalUrl, shortUrl: shortid.generate() });
        await url.save();
        res.status(201).json({
            status:"success",
            data:{
                originalUrl: url.originalUrl,
                shortUrl: url.shortUrl
            }
        });
    }catch(error){
        res.status(500).json({
            status:"failed",
            message:"Server Error"
        });
    }
}

export const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;
    try{
        const url = await Url.findOne({ shortUrl });
        if(url) {
            return res.redirect(url.originalUrl);
        }
        return res.status(404).json({
            status:"failed",
            message:"No URL Found"
        });
    }catch(error){
        res.status(500).json({
            status:"failed",
            message:"Server Error"
        });
    }
}


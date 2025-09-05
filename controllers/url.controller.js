import db from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { createShortUrlRequestSchema } from "../validations/request.validations.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
    const userId = req.user?.id;
    if(!userId){
        return res.status(401).json({error: "User is not authenticated"});
    }
    const validationResult = await createShortUrlRequestSchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({error: validationResult.error});
    }

    const { targetUrl, code } = validationResult.data;
    const shortCode = code ?? nanoid(6);

    const [result] = await db.insert(urlsTable).values({
        targetUrl,
        shortCode,
        userId: req.user.id
    }).returning({id: urlsTable.id, shortCode: urlsTable.shortCode, targetUrl: urlsTable.targetUrl});
    res.status(201).json({id: result.id, shortCode: result.shortCode, url: result.targetUrl});

}
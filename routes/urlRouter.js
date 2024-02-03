import express from 'express';
import validater from '../validateUrl.js'
import db from '../services/db.js'
import { nanoid } from 'nanoid';


const router = express.Router()

router.get("/getShortUrl", async function (req, res) {
    try {
        let longUrl = req.query.longUrl;
        if (validater.isValidUri(longUrl)) {
            const rows = await db.query(
                `Select ShortUrlId from UrlMapping where LongUrl ='${longUrl}'`
            );
            if (!rows) {
                let uniqueId = nanoid();
                var result = await db.query(
                    `insert into UrlMapping(LongUrl,ShortUrlId) values ('${longUrl}','${uniqueId}')`
                );
                if (result.affectedRows) {
                    return res.status(200).json({ "message": `http://localhost:8000/shortner/getLongUrl?url=${uniqueId}` });
                }
                return res.status(400).json({ "message": "something went wrong" });
            }
            const shortId = rows[0].ShortUrlId;
            return res.status(200).json({ "message": `http://localhost:8000/shortner/getLongUrl?url=${shortId}` });
        }
        return res.status(400).json({ "message": "invalid url" });
    } catch (error) {
        return res.status(400).json({ "message": error });
    }
})

router.get('/getLongUrl',async (req,res) => {
    try {
        let inputUrl = req.query.url
        if (validater.isValidUri(inputUrl)) {
            let uniqueId = validater.extractUniqueId(inputUrl);
            if (uniqueId !== "" && uniqueId !== null && uniqueId !== undefined) {
                const rows = await db.query(
                    `Select LongUrl from UrlMapping where ShortUrlId ='${uniqueId}'`
                );
                if (!rows) {
                    return res.status(400).json({ "message": "no data found" });
                }
                return res.status(200).json({ "message": rows[0] });
            }
            return res.status(400).json({ "message": "invalid url" });
        }
        return res.status(400).json({ "message": "invalid url" });
    } catch (error) {
        return res.status(400).json({ "message": error });
    }
});

export default router
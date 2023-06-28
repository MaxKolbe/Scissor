const express = require("express")
const connectEnsureLogin = require("connect-ensure-login")
const qrCode = require('qrcode');
const urlModel = require("../models/url")
const router = express.Router()

router.get("/", (req, res)=>{
    res.status(200)
    res.render("home")
})

router.get("/history", connectEnsureLogin.ensureLoggedIn(), async (req, res)=>{
    res.status(200)
    const url = await urlModel.find({ real: { $gt: 1 } });
    res.render("history", {url: url}) 
})
router.post("/qrcode", (req, res)=>{

    const longurl = req.body.longurl
    const long = longurl.toString()
    // console.log(long)
    qrCode.toDataURL(long, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            res.status(500).send('Error generating QR code');
            } else {
            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>QRCODE</title>
            <style>
            body{
                background-color: rgb(12, 9, 44);
                text-align: center;
                color: white;
            }
            img{
                margin: 0 auto;
            }
            </style>
            </head>
            <body>
                <h1>QR Code Generated</h1>
                    <img src="${qrCodeUrl}" alt="QR Code" />
                    <p>Scan or Take a Screenshot of this and share</p>
            </body>
            </html>
            `);
        }   
    });
})

router.get("/urlpage", connectEnsureLogin.ensureLoggedIn(), async (req, res)=>{
    const url = await urlModel.findOne().sort({ _id: -1 })
    if(url){
        console.log(url.short)
    }
    res.render("urlpage", {url: url}) 
})  

router.post("/basicUrl", async (req, res)=>{
    await urlModel.create({long: req.body.url})
    res.redirect("/scissor/urlpage")
})    

router.post("/customUrl", async (req, res)=>{
    await urlModel.create({long: req.body.longurl, short: req.body.customurl, real:  3}) 
    res.redirect("/scissor/urlpage")
})

router.get('/:url', async (req, res)=>{
    const shortUrl = await urlModel.findOne({ short: req.params.url }) 
    if (shortUrl == null){
        return res.status(404) 
    } 
    const ip = req.ip

    shortUrl.ipaddress = ip
    shortUrl.clicks++ 
    shortUrl.save()
    res.redirect(shortUrl.long)
})

module.exports = router 
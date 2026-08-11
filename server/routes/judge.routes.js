const express = require("express");
const router = express.Router();

const axios = require("axios");

router.post("/run", async (req, res) => {

    try {

        const { source_code, language_id } = req.body;

        const response = await axios.post(

            "https://judge0-ce.p.rapidapi.com/submissions",

            {
                source_code,
                language_id
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
                    "X-RapidAPI-Host":"judge0-ce.p.rapidapi.com"
                },
                params:{
                    base64_encoded:false,
                    wait:true
                }
            }

        );

        res.json(response.data);

    }

    catch(err){

        console.log(err);

        res.status(500).json(err);

    }

});

module.exports=router;
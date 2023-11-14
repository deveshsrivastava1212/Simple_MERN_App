const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Hello From the router")
})

module.exports = router;
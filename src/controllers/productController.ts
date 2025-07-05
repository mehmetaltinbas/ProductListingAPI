import express from 'express';

const router = express.Router();

router.get('/test', function (req, res) {
    console.log("get endpoint hit!");
    res.send("get endpoint perfectly tested");
});

export default router;


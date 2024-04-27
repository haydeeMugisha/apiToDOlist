import express from "express";
import {Todo} from "../model/index.js";
import {verifyToken} from "../utility/auth.utility.js";

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    res.send(await Todo.findAll());
})


export {router}




import express from "express";
import { sendNewMessage, getMessages } from "../controllers/messages_controller.js";

const router = express.Router();

router.post('/new', sendNewMessage);
router.get('/', getMessages);

export default router;

import MessageModel from '../models/messages_model.js';

export const sendNewMessage = async (req, res) => {
    const chatmessage = req.body;

    try {
        await MessageModel.create(chatmessage);
        res.status(201).json(chatmessage);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getMessages = async (req, res) => {

    try {
        const allMessages = await MessageModel.find();
        res.status(200).json(allMessages);
    } catch (error) {
        res.status(500).send(error);
    }
}
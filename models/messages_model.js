import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
});

// collection :: chat_messages
export default mongoose.model('chat_messages', messageSchema);
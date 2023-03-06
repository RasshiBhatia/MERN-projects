import mongoose from 'mongoose'

const tiktokSchema = mongoose.Schema({
    url: String,
    channel: String,
    likes: String,
})

export default mongoose.model('tiktokVideos', tiktokSchema);
import mongoose from 'mongoose'
const schem = new mongoose.Schema({
    blogId : Number,
    blogTitle : String,
    blogBody : String
})
const perfSchem = new mongoose.Schema({
    perfId: Number,
    perfTitle: String,
    perfBody: String,
    calification: Number
})

export {
    schem,
    perfSchem
}
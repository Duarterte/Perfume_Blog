import mongoose from 'mongoose';
import {schem, perfSchem} from './schems'

const schem2 = new mongoose.Schema({
    testId : Number,
    testName : String,
    testBody : String
})

const Test = mongoose.model("Testing", schem2);
const Blogs = mongoose.model("blogs", schem);
const Perfs = mongoose.model("perfs", perfSchem);
export {
    Test,
    Blogs,
    Perfs
}
import mongoose from 'mongoose';
import {schem, perfSchem} from './schems'

const Blogs = mongoose.model("blogs", schem);
const Perfs = mongoose.model("perfs", perfSchem);
export {
    Blogs,
    Perfs
}
import { Blogs, Perfs } from "./models"

export const resolvers = {
    Query : {
        getBlogs: async()  => await Blogs.find({})
        ,
        getPerfs: async (_, {categ}) => {
            if(categ){
                var resData={};

                let parsedDataSearch = 
                '{"categories": {"$in": [\"'+
                categ.reduce((combine, val)=>
                combine += "\",\""+val)+'\"]}}';
                resData = JSON.parse(parsedDataSearch);
            }            
            return categ ? await Perfs.find(resData) : await Perfs.find({})
        }
    }
}
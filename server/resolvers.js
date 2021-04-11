import { Test, Blogs, Perfs } from "./models"

export const resolvers = {
    Query : {
        hello: () => "aja listo",
        getTest: async () => await Test.find({}),
        getBlogs: async () => await Blogs.find({}),
        getPerfs: async () => await Perfs.find({})
    },
    Mutation: {
        createTest: async (_, { testName, testBody }) => {
            const testting = new Test({ testName, testBody })
            await testting.save();
            console.log(testting);
            return testting;
        }
    }
}
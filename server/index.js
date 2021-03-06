import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import { schem, perfSchem } from './schems';
dotenv.config();

const startServer = async () => {
    const app = express();
    
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    let devOrProduc = process.env.DB_USER;
    //terniary operator if is production connect to the production db if is dev connect ot the other one :V
    (devOrProduc) ?(
    await mongoose.connect('mongodb://localhost:27017/perfumes', {useNewUrlParser: true, useUnifiedTopology: true, user: process.env.DB_USER, pass: process.env.DB_PASS})):(
    mongoose.connect(`mongodb://mongo:27017/perfumes`, {useNewUrlParser: true, useUnifiedTopology: true}).then(res=>console.log("connected")).catch(err=>console.log(err))
    )

    var blogtorem = new mongoose.model('blogs', schem);
    var blogup = new mongoose.model('blogs', schem);
    var allBlogs = new mongoose.model('blogs', schem);
    var revup = new mongoose.model('perfs', perfSchem);
    var revrem = new mongoose.model('perfs', perfSchem);
    var allPerfs = new mongoose.model('perfs', perfSchem);
    app.set('view engine', 'handlebars')
    app.engine('handlebars', handlebars())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use('/static', express.static(__dirname+'/api/static/'))
    
    app.use('/', express.static(__dirname+'/build/')) 
    server.applyMiddleware({app})    
    
    app.get('/api', (req, res)=>{
        res.render('home', {parametro: "este parametro", numero: 1515});
        res.cookie('joda' , 'value', {expire : new Date() + (180*1000)});
    })
    app.get('/blog',(req, res)=>{
        res.sendFile(__dirname+'/api/blog.html');
    })
    app.post('/blog',async (req, res)=>{
        const Blog = new mongoose.model("blogs", schem);
        const myBlog = new Blog(req.body);
        await myBlog.save();
        console.log(req.body);
        console.log(myBlog);
        res.redirect("http://localhost:4000/api");
    })
   
    app.get("/blogupdate", (req, res)=>{
        res.sendFile(__dirname+'/api/blogupdate.html')
    })

    app.post("/blogupdate", async (req, res)=>{
        let allBody  = req.body;
        console.log(allBody);
        await blogup.findOneAndUpdate({blogTitle: allBody.prevTitle}, {blogTitle: allBody.newTitle, blogBody: allBody.newBody}, {new: true})
        res.redirect("http://localhost:4000/api");
    })

    app.get('/removeblog', (req, res)=>{
        res.sendFile(__dirname+'/api/remove.html')
    })
    app.post('/removeblog', async (req, res)=>{
        let allBody  = req.body;
        console.log(allBody);

        await blogtorem.deleteMany(allBody, function(err){
            if (err) return res.send(500, {error: err})
        });
        res.redirect("http://localhost:4000/api");
    })
    app.get('/getblogs', async (req, res)=>{
        let allB = await allBlogs.find();
               
        res.render('allb', {layout:'blogs', data: allB})
    })
    app.get('/review', (req, res)=>{
        res.sendFile(__dirname+'/api/review.html')
    })    

    app.post('/review',async (req, res)=>{
        let allBody = req.body;
        let Review = new mongoose.model('perfs', perfSchem);
        let categories = allBody.categories.toUpperCase().split(" ");

        console.log(categories)
        let addReview = new Review({perfTitle: allBody.perfTitle, perfBody: allBody.perfBody, calification: allBody.calification/10, categories});
        await addReview.save();
        res.redirect('http://localhost:4000/api');
    })    
    app.get('/perfupdate', (req, res)=> {
        res.sendFile(__dirname+'/api/perfupdate.html')
    })
    app.post('/perfupdate', async (req, res)=>{
        let allBody = req.body;
        console.log(allBody);
        await revup.findOneAndUpdate({perfTitle: allBody.perPerf}, {perfTitle: allBody.perfTitle, perfBody: allBody.perfBody, calification: allBody.calification/10}, {new: true}, (err)=>{
            if(err){
                console.log(err);
            }
            else {
                res.redirect('http://localhost:4000/api');
            }
        })
    })

   app.get('/perfremove', (req, res)=>{
    res.sendFile(__dirname+'/api/perfremove.html')
   })

   app.post('/perfremove', async (req, res)=>{
       await revrem.deleteMany(req.body, (err)=>{
           if(err) {
               console.log(err)
           }
       });
       res.redirect('http://localhost:4000/api');
   })
   app.get('/getperfs', async (req, res)=>{
        let allP = await allPerfs.find();
               
        res.render('allp', {layout:'blogs', data: allP})
    })
    app.listen(4000,()=>{
        console.log(`http://localhost:4000${server.graphqlPath}`)
    })
}
startServer();

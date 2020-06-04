import { v4 as uuid } from 'uuid';
import bcypt from 'bcrypt'
import { useStore } from 'react-redux';
import passport from 'passport'
import initialize from '../../athenConfig'
import insertArticle from '../controller/articlecontrl'
import {Article, User} from '../db/schema'
import mongoose from 'mongoose'

//it should be use in database
const users = []
initialize(
    passport, 
    email => users.find(user => user.email === email)
)

export default router => {
    // test
    router.get("/msg", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.json({ message: `Hello, WikiForum User! Unique ID: ${uuid()}` });
        //res.send(`Hello you touched the server and the id is ${uuid()}`)
    });

    router.get("/greeting", (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");

        res.json({ message: `Hello, world! Unique ID: ${uuid()}` });

    });

    router.post("/calculate", (req, res) => {

        const result = parseInt(req.body.a) + parseInt(req.body.b);
        res.json({ result });

    });

    router.post("/article/newArticle", (req, res)=> {
        console.log("server recieved the post req, handling...",req.body)
        //insertArticle is not a function, why? 
        
        //if (req.user) {
        // if (true) {
        //     insertArticle(req.body).then(
        //     (result) => { res.send(Object.assign({}, result._doc, { postCreated: true })); },
        //     (error) => { res.send({ postCreated: false }); }
        //   );
        // } else {
        //   res.send({ postCreated: false });
        // }
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id,
            date: new Date()
          });
            newArticle.save().then(
            (result) => {console.log(result)},
            (error) => { res.send({ postCreated: false }); }
          );
    });

    router.post("/article/newArticle", (req, res)=> {
        
    });

    router.post('/signup', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        console.log('the req body is: ',req.body)
        try{
            const hashedPassword = await bcypt.hash(req.body.password, 10)
            users.push({
                id: uuid().toString(),
                email: req.body.email,
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                password: hashedPassword
            })
            res.redirect('http://localhost:3000/login_page')
        } catch {
            console.log('issues happen when sign up')
            res.redirect('http://localhost:3000/signup_page')
        }
    })

    router.post('/login', passport.authenticate('local', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect: 'http://localhost:3000/login_page',
        failureFlash: true
    }))
    
}
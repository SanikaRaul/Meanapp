const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const Post = require("./models/post");


const app = express();
mongoose
.connect("mongodb+srv://sanika:ZdYy9MN0DOzr9xS5@cluster0-a2hav.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>
{
console.log("Connected to the database");
})
.catch(()=>
{
console.log("connection failed!!!!");
});
//portnumber
const port = 3000;

//adding middleware
app.use(cors());

//adding body parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

app.listen(port,()=>
{
	console.log("the server is running at port number",port);
});
module.exports = app;


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});



app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId:  createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

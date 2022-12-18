//const mongoose = require('mongoose')

//var ObjectId = mongoose.Types.ObjectId


db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
});

/* db.createCollection('todos');

db.todos.insert({ text: 'Write code', done: true });
db.todos.insert({ text: 'Learn about containers', done: false }); */

db.createCollection('blogs');

/* db.blogs.insert({ text: 'Learn about containers', done: false });
db.blogs.insert({ text: 'Learn about cont2rs', done: false });
db.blogs.insert({ text: '3', done: false }); */


db.blogs.insert({
  _id:new ObjectId("5dda6f5cfbc2533d5c803918"),
  title:"First class tests",
  author:"Robert C. Martin",
  url:"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
  likes:5,
  user:new ObjectId("5d4caf42c2f4450c24ad2cf6"),
  comments:["Test comment","Another comment","newcom","Another one"]
})
db.blogs.insert({
  _id:new ObjectId("5de7bbaff933cb1ed88b11cb"),
  title:"Go To Statement Considered Harmful",
  author:"Edsger W. Dijkstra",
  url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes:4,
  user:new ObjectId("5d4caf42c2f4450c24ad2cf6"),
  comments:["testing from mobile"]
}) 
db.blogs.insert({
  _id:new ObjectId("5dda7612fbc2533d5c80391b"),
  title:"David Walsh Blog",
  author:"David Walsh",
  url:"https://davidwalsh.name/",
  likes:10,
  user:new ObjectId("5dda6c5dfbc2533d5c803911"),
  comments:["123", "456", "789"]
})
db.blogs.insert({
  _id:new ObjectId("5dda7826fbc2533d5c80391c"),
  title:"React patterns",
  author:"Michael Chan",
  url:"https://reactpatterns.com",
  likes:10,
  user:new ObjectId("5dda6c5dfbc2533d5c803911"),
  comments:["123", "456", "789"]
})
db.blogs.insert({
  _id:new ObjectId("5dda788bfbc2533d5c80391d"),
  title:"Canonical string reduction",
  author:"Edsger W. Dijkstra",
  url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes:10,
  user:new ObjectId("5dda6c5dfbc2533d5c803911"),
  comments:["123", "456", "789"]
})



db.createCollection('users');

db.users.insert({
  _id:new ObjectId("5d4caf42c2f4450c24ad2cf6"),
  blogs:[new ObjectId("5dda6f5cfbc2533d5c803918"),new ObjectId("5de7bbaff933cb1ed88b11cb")],
  username:"Lisa2",
  name:"Lisa Simpson",
  passwordHash:"$2a$10$nim9wk44RLMq/h.gFRxK8Oo8tX3AsVssCYulsGrs3fsXO7BJNBfN2"
})
db.users.insert({
  _id:new ObjectId("5dda6c5dfbc2533d5c803911"),
  blogs:[new ObjectId("5dda7612fbc2533d5c80391b"),new ObjectId("5dda7826fbc2533d5c80391c"),new ObjectId("5dda788bfbc2533d5c80391d")],
  username:"Homer",
  name:"Homer Simpson",
  passwordHash:"$2a$10$uDf4.LdUVZNWacJebtEEkeVSRnFwWFC10RwqK3OgqQ1ONzi49rdZy"
})


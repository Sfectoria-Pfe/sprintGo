const Users = require('./userModel');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

const salt = bcrypt.genSaltSync(10);

mongoose
	.connect("mongodb+srv://ramziboughanmi10:D9bFuO9eevKzHTxg@cluster0.tavoegl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Database connection is successful!');
		
	})
	.catch((err) => {
		console.log(`Database connection failed!`);
		console.log(`Details : ${err}`);
	});

const seed = async () => {
   

    try {
        await   Users.create({
            name:"Farouk",
            surname :"Farouk",
            email : "Farouk@sfectoria.com",
            password : bcrypt.hashSync("admin", salt),
            avatar : "avatar.png", 
            color:"red",
            role : "admin"
        }) 
        console.log("seeded");
      } catch (error) {
          console.log(error);
      }
}

seed()
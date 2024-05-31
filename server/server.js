const dotenv = require('dotenv');
const express = require('express');
const unless = require('express-unless');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./Routes/userRoute');
const boardRoute = require('./Routes/boardRoute');
const listRoute = require('./Routes/listRoute');
const cardRoute = require('./Routes/cardRoute');
const auth = require('./Middlewares/auth');
const workSpaceRoute = require('./Routes/workSpaceRoute')
const board_workspaceRoute =require ('./Routes/board_workspaceRoute')
const ChatRoute =require( './Routes/ChatRoutes.js')
const MessageRoute  =require('./Routes/messageRouter.js')


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// AUTH VERIFICATION AND UNLESS

auth.verifyToken.unless = unless;

app.use(
	auth.verifyToken.unless({
		path: [
			{ url: '/user/login', method: ['POST'] },
			{ url: '/user/register', method: ['POST'] },
		],
	})
);

//MONGODB CONNECTION

mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.MONGO_URI, {
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

	

//ROUTES

app.use('/user', userRoute);
app.use('/board', boardRoute);
app.use('/list', listRoute);
app.use('/card', cardRoute);
app.use('/workspace', workSpaceRoute );
app.use('/boardw',board_workspaceRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)

app.listen(process.env.PORT, () => {
	console.log(`Server is online! Port: ${process.env.PORT}`);
});

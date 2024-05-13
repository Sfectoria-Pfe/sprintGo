const workspaceModel =require('../Models/workSpaceModel')
const boardModel = require('../Models/boardModel');
const userModel = require('../Models/userModel');

const create = async (req, callback) => {
	try {
		const { title, backgroundImageLink, members  } = req.body;
        const { workspaceId } = req.params;
        // Create and save new board
		let newBoard = boardModel({ title, backgroundImageLink });
		newBoard.save();

        // Fetch the workspace and add the board to it
        const workspace = await workspaceModel.findById(workspaceId);
        if (!workspace) {
            return callback({ errMessage: 'Workspace not found' });
        }
        workspace.boards.push(newBoard._id);
		
        await workspace.save();
console.log("new board : ", newBoard);

		// Add this board to owner's boards
		const user = await userModel.findById(req.user.id);
		user.boards.unshift(newBoard.id);
		await user.save();

		// Add user to members of this board
		let allMembers = [];
		allMembers.push({
			user: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			color: user.color,
			role: 'owner',
		});

		// Save newBoard's id to boards of members and,
		// Add ids of members to newBoard
		await Promise.all(
			members.map(async (member) => {
				const newMember = await userModel.findOne({ email: member.email });
				newMember.boards.push(newBoard._id);
				await newMember.save();
				allMembers.push({
					user: newMember._id,
					name: newMember.name,
					surname: newMember.surname,
					email: newMember.email,
					color: newMember.color,
					role: 'member',
				});
				//Add to board activity
				newBoard.activity.push({
					user: user.id,
					name: user.name,
					action: `added user '${newMember.name}' to this board`,
				});
			})
		);

		// Add created activity to activities of this board
		newBoard.activity.unshift({ user: user._id, name: user.name, action: 'created this board', color: user.color });

		// Save new board
		newBoard.members = allMembers;
		await newBoard.save();

		return callback(false, newBoard);
	} catch (error) {
		return callback({
			errMessage: 'Something went wrong',
			details: error.message,
		});
	}
};

const getAll = async (req, callback) => {
	try {
		// Get user
		const { workspaceId } = req.params;
		const workspace = await workspaceModel.findById(workspaceId);
		console.log("this is workspace :", workspace);
		// Get board's ids of user
		const boardIds = workspace.boards;

		// Get boards of user
		const boards = await boardModel.find({ _id: { $in: boardIds } });

		// Delete unneccesary objects
		boards.forEach((board) => {
			board.activity = undefined;
			board.lists = undefined;
		});

		return callback(false, boards);
	} catch (error) {
		return callback({ msg: 'Something went wrong', details: error.message });
	}
};

const getById = async (id, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(id);
		return callback(false, board);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const getActivityById = async (id, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(id);
		return callback(false, board.activity);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const updateBoardTitle = async (boardId, title, user, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(boardId);
		board.title = title;
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: 'update title of this board',
			color: user.color,
		});
		await board.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const updateBoardDescription = async (boardId, description, user, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(boardId);
		board.description = description;
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: 'update description of this board',
			color: user.color,
		});
		await board.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const updateBackground = async (id, background, isImage, user, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(id);

		// Set variables
		board.backgroundImageLink = background;
		board.isImage = isImage;

		// Log the activity
		board.activity.unshift({
			user: user._id,
			name: user.name,
			action: 'update background of this board',
			color: user.color,
		});

		// Save changes
		await board.save();

		return callback(false, board);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const addMember = async (id, members, user, callback) => {
	try {
		// Get board by id
		const board = await boardModel.findById(id);

		// Set variables
		await Promise.all(
			members.map(async (member) => {
				const newMember = await userModel.findOne({ email: member.email });
				newMember.boards.push(board._id);
				await newMember.save();
				board.members.push({
					user: newMember._id,
					name: newMember.name,
					surname: newMember.surname,
					email: newMember.email,
					color: newMember.color,
					role: 'member',
				});
				//Add to board activity
				board.activity.push({
					user: user.id,
					name: user.name,
					action: `added user '${newMember.name}' to this board`,
					color: user.color,
				});
			})
		);
		// Save changes
		await board.save();

		return callback(false, board.members);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
	
};
const deleteById = async (workspaceId,boardId, user, callback) => {
	try {
		// Get models
		
		const board = await boardModel.findById(boardId);
		// const workspace = await workspaceModel.findById(workspaceId);
		
		// Delete the board
		const result = await boardModel.findByIdAndDelete(boardId);

		
		// // Add activity log to board
		// workspace.activity.unshift({
		// 	user: user._id,
		// 	name: user.name,
		// 	action: `deleted ${result.title} from ${workspace.title}`,
		// 	color: user.color,
		// });
		// await workspace.save();

		return callback(false, { message: 'Success' });
	} catch (error) {
		return callback({ errMessage: 'Something went wrong', details: error.message });
	}
};

module.exports = {
	create,
	getAll,
	getById,
	getActivityById,
	updateBoardTitle,
	updateBoardDescription,
	updateBackground,
	addMember,
	deleteById,
};
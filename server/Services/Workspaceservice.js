
const WorkSpaceModel = require('../Models/WorkSpaceModel');
const userModel = require('../Models/userModel');

const create = async (req, callback) => {
	try {
		const { title, members } = req.body;
		// Create and save new WorkSpace
		let newWorkSpace = WorkSpaceModel({ title});
		newWorkSpace.save();

		// Add this WorkSpace to owner's workSpaces
		const user = await userModel.findById(req.user.id);
		user?.workSpaces?.unshift(newWorkSpace.id);
		await user.save();

		// Add user to members of this WorkSpace
		let allMembers = [];
		allMembers?.push({
			user: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			color: user.color,
			role: 'owner',
		});

		// Save newWorkSpace's id to workSpaces of members and,
		// Add ids of members to newWorkSpace
		await Promise.all(
			members?.map(async (member) => {
				const newMember = await userModel.findOne({ email: member.email });
				newMember.workSpaces?.push(newWorkSpace._id);
				await newMember.save();
				allMembers.push({
					user: newMember._id,
					name: newMember.name,
					surname: newMember.surname,
					email: newMember.email,
					color: newMember.color,
					role: 'member',
				});
				//Add to WorkSpace activity
				newWorkSpace.activity?.push({
					user: user.id,
					name: user.name,
					action: `added user '${newMember.name}' to this WorkSpace`,
				});
			})
		);

		// Add created activity to activities of this WorkSpace
		newWorkSpace?.activity?.unshift({ user: user._id, name: user.name, action: 'created this WorkSpace', color: user.color });

		// Save new WorkSpace
		newWorkSpace.members = allMembers;
		await newWorkSpace.save();

		return callback(false, newWorkSpace);
	} catch (error) {
		return callback({
			errMessage: 'Something went wrong',
			details: error.message,
		});
	}
};

const getAll = async (userId, callback) => {
	try {
		// Get user
		const user = await userModel.findById(userId);

		// Get WorkSpace's ids of user
		const WorkSpaceIds = user.workSpaces;

		// Get workSpaces of user
		const workSpaces = await WorkSpaceModel.find({ _id: { $in: WorkSpaceIds } });

		// Delete unneccesary objects
		workSpaces.forEach((WorkSpace) => {
			WorkSpace.activity = undefined;
			WorkSpace.boards = undefined;
		});

		return callback(false, workSpaces);
	} catch (error) {
		return callback({ msg: 'Something went wrong', details: error.message });
	}
};

const getById = async (id, callback) => {
	try {
		// Get WorkSpace by id
		const WorkSpace = await WorkSpaceModel.findById(id);
		return callback(false, WorkSpace);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const getActivityById = async (id, callback) => {
	try {
		// Get WorkSpace by id
		const WorkSpace = await WorkSpaceModel.findById(id);
		return callback(false, WorkSpace.activity);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

const updateWorkSpaceTitle = async (WorkSpaceId, title, user, callback) => {
	try {
		// Get WorkSpace by id
		const WorkSpace = await WorkSpaceModel.findById(WorkSpaceId);
		WorkSpace.title = title;
		WorkSpace.activity.unshift({
			user: user._id,
			name: user.name,
			action: 'update title of this WorkSpace',
			color: user.color,
		});
		await WorkSpace.save();
		return callback(false, { message: 'Success!' });
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};




const addMember = async (id, members, user, callback) => {
	try {
		// Get WorkSpace by id
		const WorkSpace = await WorkSpaceModel.findById(id);

		// Set variables
		await Promise.all(
			members.map(async (member) => {
				const newMember = await userModel.findOne({ email: member.email });
				newMember.workSpaces.push(WorkSpace._id);
				await newMember.save();
				WorkSpace.members.push({
					user: newMember._id,
					name: newMember.name,
					surname: newMember.surname,
					email: newMember.email,
					color: newMember.color,
					role: 'member',
				});
				//Add to WorkSpace activity
				WorkSpace.activity.push({
					user: user.id,
					name: user.name,
					action: `added user '${newMember.name}' to this WorkSpace`,
					color: user.color,
				});
			})
		);
		// Save changes
		await WorkSpace.save();

		return callback(false, WorkSpace.members);
	} catch (error) {
		return callback({ message: 'Something went wrong', details: error.message });
	}
};

module.exports = {
	create,
	getAll,
	getById,
	getActivityById,
	updateWorkSpaceTitle,

	addMember,
};
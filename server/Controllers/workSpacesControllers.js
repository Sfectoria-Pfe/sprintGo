const boardModel = require('../Models/boardModel');
const workSpaceModel = require('../Models/workSpaceModel');
const workSpaceService = require('../Services/Workspaceservice');

const create = async (req, res) => {
	const { title } = req.body;
	if (!(title ))
		return res.status(400).send({ errMessage: 'Title cannot be null' });
	await workSpaceService.create(req, (err, result) => {
		if (err) return res.status(500).send(err);
		result.__v = undefined;
		return res.status(201).send(result);
	});
};

const getAll = async (req, res) => {
	const userId = req.user.id;
	await workSpaceService.getAll(userId, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

const getById = async (req, res) => {
	// Validate whether params.id is in the user's workSpaces or not
	const validate = req.user.workSpaces.filter((workSpace) => workSpace === req.params.id);
	if (!validate)
		return res.status(400).send({ errMessage: 'You can not show the this workSpace, you are not a member or owner!' });

	// Call the service
	await workSpaceService.getById(req.params.id, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

const getActivityById = async (req, res) => {
	// Validate whether params.id is in the user's workSpaces or not
	const validate = req.user.workSpaces.filter((workSpace) => workSpace === req.params.id);
	if (!validate)
		return res.status(400).send({ errMessage: 'You can not show the this workSpace, you are not a member or owner!' });

	// Call the service
	await workSpaceService.getActivityById(req.params.id, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

const updateworkSpaceTitle = async (req, res) => {
	// Validate whether params.id is in the user's workSpaces or not
	const validate = req.user.workSpaces.filter((workSpace) => workSpace === req.params.id);
	if (!validate)
		return res
			.status(400)
			.send({ errMessage: 'You can not change title of this workSpace, you are not a member or owner!' });
	const { workSpaceId } = req.params;
	const { title } = req.body;
	// Call the service
	await workSpaceService.updateWorkSpaceTitle(workSpaceId, title, req.user, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};




const addMember = async (req, res) => {
	// Validate whether params.id is in the user's workSpaces or not
	const validate = req.user.workSpaces.filter((workSpace) => workSpace === req.params.id);
	if (!validate)
		return res
			.status(400)
			.send({ errMessage: 'You can not add member to this workSpace, you are not a member or owner!' });
	const { workSpaceId } = req.params;
	const { members } = req.body;
	// Call the service
	await workSpaceService.addMember(workSpaceId, members, req.user, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};
const deleteById = async (req, res) => {
	// deconstruct the params
	const user = req.user;
	const { workspaceId } = req.params;
	const workspace = await workSpaceModel.findById({_id:workspaceId})
	if(workspace?.boards?.length) {
		for(let id of workspace.boards){
			await boardModel.findByIdAndDelete(id)
		}
		
	}
	await workSpaceModel.findByIdAndRemove({_id:workspaceId})
};
module.exports = {
	create,
	getAll,
	getById,
	getActivityById,
	updateworkSpaceTitle,
	deleteById,
	addMember,
};

const workSpaceModel = require('../Models/workSpaceModel');
const boardService = require('../Services/board_workspace');

const create = async (req, res) => {
	const { title, backgroundImageLink } = req.body;
	if (!(title && backgroundImageLink))
		return res.status(400).send({ errMessage: 'Title and/or image cannot be null' });
	await boardService.create(req, (err, result) => {
		if (err) return res.status(500).send(err);
		result.__v = undefined;
		return res.status(201).send(result);
	});
};

const getAll = async (req, res) => {
	
    
    
	await boardService.getAll(req, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

// const getAll = async (req, res) => {
// 	// Assing parameter to constant
// 	const workspaceId = req.params.id;
   
// 	// Validate whether boardId is in the user's board or not

// 	const validate = req.user?.workspaces?.filter((workspace) => workspace === workspaceId);
// 	if (!validate)
// 		return res.status(400).send({ errMessage: 'You cannot get boards, because you are not owner of this workspaces!' });

// 	// Call the service to get all lists whose owner id matches the boardId
// 	await boardService.getAll(workspaceId, (err, result) => {
// 		if (err) return res.status(500).send(err);
// 		return res.status(200).send(result);
// 	});
// };

// const getAll = async (req, res) => {
//     const workspaceId = req.params.id;

//     await boardService.getAll(workspaceId, (err, result) => {
//         if (err) return res.status(500).send(err);
//         return res.status(200).send(result);
//     });
// };




const getById = async (req, res) => {
	// Validate whether params.id is in the user's boards or not
	const validate = req.user.boards.filter((board) => board === req.params.id);
	if (!validate)
		return res.status(400).send({ errMessage: 'You can not show the this board, you are not a member or owner!' });

	// Call the service
	await boardService.getById(req.params.id, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

const getActivityById = async (req, res) => {
	// Validate whether params.id is in the user's boards or not
	const validate = req.user.boards.filter((board) => board === req.params.id);
	if (!validate)
		return res.status(400).send({ errMessage: 'You can not show the this board, you are not a member or owner!' });

	// Call the service
	await boardService.getActivityById(req.params.id, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

const updateBoardTitle = async (req, res) => {
	// Validate whether params.id is in the user's boards or not
	const validate = req.user.boards.filter((board) => board === req.params.id);
	if (!validate)
		return res
			.status(400)
			.send({ errMessage: 'You can not change title of this board, you are not a member or owner!' });
	const { boardId } = req.params;
	const { title } = req.body;
	// Call the service
	await boardService.updateBoardTitle(boardId, title, req.user, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

const updateBoardDescription = async (req, res) => {
	// Validate whether params.id is in the user's boards or not
	const validate = req.user.boards.filter((board) => board === req.params.id);
	if (!validate)
		return res
			.status(400)
			.send({ errMessage: 'You can not change description of this board, you are not a member or owner!' });
	const { boardId } = req.params;
	const { description } = req.body;
	// Call the service
	await boardService.updateBoardDescription(boardId, description, req.user, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

const updateBackground = async (req, res) => {
	// Validate whether params.id is in the user's boards or not
	const validate = req.user.boards.filter((board) => board === req.params.id);
	if (!validate)
		return res
			.status(400)
			.send({ errMessage: 'You can not change background of this board, you are not a member or owner!' });
	const { boardId } = req.params;
	const { background, isImage } = req.body;
	// Call the service
	await boardService.updateBackground(boardId, background, isImage, req.user, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
};

const addMember = async (req, res) => {
	// Validate whether params.id is in the user's boards or not
	const validate = req.user.boards.filter((board) => board === req.params.id);
	if (!validate)
		return res
			.status(400)
			.send({ errMessage: 'You can not add member to this board, you are not a member or owner!' });
	const { boardId } = req.params;
	const { members } = req.body;
	// Call the service
	await boardService.addMember(boardId, members, req.user, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(200).send(result);
	});
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
};

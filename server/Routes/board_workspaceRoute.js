const express = require('express');
const boardController = require('../Controllers/bord_workspaceController');
const route = express.Router();

route.post('/:boardId/add-member', boardController.addMember);
route.put('/:boardId/update-background', boardController.updateBackground);
route.put('/:boardId/update-board-description', boardController.updateBoardDescription);
route.put('/:boardId/update-board-title', boardController.updateBoardTitle);
route.post('/:workspaceId/create', boardController.create);
route.get('/:id', boardController.getById);
route.get('/:id/activity', boardController.getActivityById);
route.get('/:workspaceId/get', boardController.getAll);

module.exports = route;

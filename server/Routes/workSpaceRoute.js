const express = require('express');
const workSpaceController = require('../Controllers/workSpacesControllers');
const route = express.Router();

route.post('/:workSpaceId/add-member', workSpaceController.addMember);
route.put('/:workSpaceId/update-workSpace-title', workSpaceController.updateworkSpaceTitle);
route.post('/create', workSpaceController.create);
route.get('/:id', workSpaceController.getById);
route.get('/:id/activity', workSpaceController.getActivityById);
route.get('/', workSpaceController.getAll);

module.exports = route;

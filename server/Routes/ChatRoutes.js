const express= require ('express')
const { createChat, findChat, userChats }= require ( '../Controllers/chatControllers');
const router = express.Router()

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

module.exports = router
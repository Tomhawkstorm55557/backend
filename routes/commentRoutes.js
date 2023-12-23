const express = require("express");

const { addReply, createComment, getComments, deleteReply } = require('../controllers/commmentController');


const router = express.Router();

router.post('/:postId/createComment', createComment); // Changed "postid" to "postId"
router.get('/:postId/comments', getComments); // Changed "postid" to "postId"
router.put('/:commentId/reply', addReply)

router.delete('/:commentId/replies/:replyId', deleteReply)



module.exports = router;
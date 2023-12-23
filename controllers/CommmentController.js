 const Comment = require("../models/CommentModel.js");

const getComments = async (req, res) => {
    const id = req.params.postId
    try {
        if (id) {
            let comments = await Comment.find({ postId: id }).sort({ createdAt: 'desc' });


            let replies = comments?.map((comment) => {
                return comment?.replies?.length >= 0 ? comment?.replies?.reverse() : []
            })

            //comment.replies || []
            let newcomments = [...comments, replies]
                .slice(0, replies?.length);

            console.log('new comments----------', newcomments);

            res.json(newcomments);
        } else {
            res.status(404).json({ message: 'There is Not Post id there to get all comments', error: error });
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Comments From Server', error: error });
    }
}

const createComment = async (req, res) => {
    let id = req.params?.postId;
    try {
        if (id) {
            console.log('Received POST request with postId:', id);
            console.log('Request body:', req.body);
            const commentCreated = await Comment.create({
                postId: id, // Use 'id' instead of 'postId'
                username: req.body?.username,
                comment: req.body?.comment,
                Photo: req.body?.Photo,

                
            })

            res.status(201).send(commentCreated)
        } else {
            res.status(400).json({ message: 'Invalid postId provided', providedPostId: id }); // Use 'id' instead of 'postId'
        }
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
}

const addReply = async (req, res) => {
    let id = req.params?.commentId;
    try {
        console.log('Received request body:', req.body);
        if (id) {


        const newReply = {
            commentId: id,
            username: req.body?.username,
            text: req.body?.text, 
            url: req.body?.url || null,
            
          
            Photo: req.body?.Photo,
        };

        let comment = await Comment.findByIdAndUpdate(
            { _id: id },
            { $push: { replies: newReply } },
            { new: true }
        );

        res.json(comment);

    } else {
        res.status(404).json({ message: 'Comment with this id not found!' })
    }

} catch (error) {
    res.status(401).json({ message: 'Problem with Getting Comment From Server', error: error });
}
}



const deleteReply = async (req, res) => {
    let id = req.params?.commentId;
    let replyId = req.params?.replyId;
    try {
        if (id && replyId) {
            let comment = await Comment.findByIdAndUpdate({ _id: id }, { $pull: { replies: { _id: replyId } } }, { new: true },)
            res.json(comment);
        } else {
            res.status(404).json({ message: 'Post with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting Comment From Server', error: error });
    }
}

module.exports = {
    getComments,
    createComment,
    addReply,
    deleteReply
};

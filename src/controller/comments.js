import {comments} from "../models/comments.js";

//CRUD Operations for Comments:
// - Implement route handlers for creating, reading, updating, and deleting comments 

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { content, post, author } = req.body;
    const newComment = new comments({ 
        content, post, author 
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error)
  }
}


// get all comments with pagination and sorting
//   - Users should be able to view comments on blog posts and add their own comments.
export const getAllComments = async (req, res) => {
  try {
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit)||10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < await comments.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }
    results.results = await comments.find()
    .limit(limit)
    .skip(startIndex)
    .populate({
      path: 'author',
      select: 'username'
    })
    .populate({
        path: 'post',
        select: 'title'
    })
    .exec();
    res.json(results);
  } catch (error) {
    console.log(error)
  }
}



export const userswatchComments = async (req, res) => {
  try {
    const authorId = req.params.id; // Assuming `id` refers to the author's ID
    console.log(authorId);

    // Find comments by the specified author
    const comment = await comments.find({ author: authorId })

    // Check if comments were found
    if (comment.length === 0) {
      return res.status(404).json({ message: "No comments found for this author" });
    }

    // Send the found comments in the response
    res.status(200).json({ message: "Comments found", comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a comment
export const deleteComment = async (req, res) => {
  try {
      const commentId = req.params.id;
      const deletedComment = await comments.findByIdAndDelete(commentId);

      if (!deletedComment) {
          return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({ message: "Comment deleted successfully", deletedComment });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};


// update a comment
export const updateComment = async (req, res) => {
    try{

        const UpdateComment = req.params.id;
        const { content, post, author } = req.body;
        const result = await comments.findByIdAndUpdate(UpdateComment,{content, post, author});
        if(!result) return res.status(404).json({message: "No Comments Found"});
        res.status(200).json("updated data is",result);

    }catch(error){
        console.log(error);
    }
}
    

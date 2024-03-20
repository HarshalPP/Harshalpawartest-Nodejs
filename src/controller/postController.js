import {Post} from '../models/post.js';


// createPost 
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ 
        title, content, author 
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    
  }
}

// get all post with pagination and sorting
export const getAllPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit)||10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < await Post.countDocuments().exec()) {
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
    results.results = await Post.find()
    .limit(limit)
    .skip(startIndex)
    .populate({
      path: 'author',
      select: 'username'
    })
    .exec();
    res.json(results);
  } catch (error) {
    console.log(error)
  }
}


// delete a post
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error)
  }
}

// update a post

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  }
  catch(error){
    console.log(error)
  }
}


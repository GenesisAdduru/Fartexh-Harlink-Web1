const { supabase } = require('../index');

// Create forum post
exports.createPost = async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    const { category, title, content } = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from('forum_posts')
      .insert([
        {
          userId,
          category,
          title,
          content,
          likes: 0,
          votes: 1,
          createdAt: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    res.json({ message: 'Post created successfully', post: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get forum posts
exports.getPosts = async (req, res) => {
  try {
    const { category } = req.query;

    let query = supabase.from('forum_posts').select('*');

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('createdAt', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          postId,
          userId,
          text,
          createdAt: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    res.json({ message: 'Comment added successfully', comment: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Vote on post
exports.votePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { delta } = req.body;

    const { data: post, error: fetchError } = await supabase
      .from('forum_posts')
      .select('votes')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    const { data, error } = await supabase
      .from('forum_posts')
      .update({ votes: post.votes + delta })
      .eq('id', postId)
      .select();

    if (error) throw error;

    res.json({ message: 'Vote submitted', post: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

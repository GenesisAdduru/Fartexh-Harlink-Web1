const { supabase } = require('../index');

// Create wig request
exports.createWigRequest = async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    const { firstName, lastName, hairType, hairLength, story, hairColor, hairTexture } = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from('wig_requests')
      .insert([
        {
          userId,
          firstName,
          lastName,
          hairType,
          hairLength,
          story,
          hairColor,
          hairTexture,
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    res.json({ message: 'Wig request submitted successfully', request: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get wig requests
exports.getWigRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('wig_requests')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get wig request by ID
exports.getWigRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('wig_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update wig request status
exports.updateWigRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('wig_requests')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({ message: 'Wig request status updated', request: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

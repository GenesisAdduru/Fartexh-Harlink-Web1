const { supabase } = require('../index');

// Create donation
exports.createDonation = async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    const { fullName, email, phone, hairLength, hairColor, address, reason } = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from('donations')
      .insert([
        {
          userId,
          fullName,
          email,
          phone,
          hairLength,
          hairColor,
          address,
          reason,
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;

    res.json({ message: 'Donation submitted successfully', donation: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get donations
exports.getDonations = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get donation by ID
exports.getDonationById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update donation status
exports.updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('donations')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({ message: 'Donation status updated', donation: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

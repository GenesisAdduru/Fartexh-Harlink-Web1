const { supabase } = require('../index');

// Register user
exports.registerUser = async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase not configured' });

  try {
    const { email, password, firstName, lastName, userType, country, region, postalCode, age, gender, phone } = req.body;

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Store user profile in database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email,
          firstName,
          lastName,
          userType,
          country,
          region,
          postalCode,
          age,
          gender,
          phone,
          createdAt: new Date().toISOString(),
        },
      ]);

    if (userError) throw userError;

    res.json({ message: 'User registered successfully', user: authData.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json({ message: 'Login successful', session: data.session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { firstName, lastName, phone, country, region } = req.body;

    const { data, error } = await supabase
      .from('users')
      .update({ firstName, lastName, phone, country, region })
      .eq('id', userId)
      .select();

    if (error) throw error;

    res.json({ message: 'Profile updated successfully', user: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout user
exports.logoutUser = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import '../styles/auth.css';

const initialRegister = {
  firstName: '',
  lastName: '',
  country: '',
  region: '',
  postalCode: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: 'donor',
};

const initialLogin = { email: '', password: '' };

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(true);
  const [registerForm, setRegisterForm] = useState(initialRegister);
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode === 'login') setIsRegister(false);
    else if (mode === 'register') setIsRegister(true);
  }, [location.search]);

  const setMode = (mode) => {
    setIsRegister(mode === 'register');
    setMessage(null);
    if (mode === 'register') {
      document.querySelector('.container')?.classList.add('active');
    } else {
      document.querySelector('.container')?.classList.remove('active');
    }
  };

  useEffect(() => {
    if (isRegister) document.querySelector('.container')?.classList.add('active');
    else document.querySelector('.container')?.classList.remove('active');
  }, [isRegister]);

  function handleRegisterFormChange(e) {
    const { name, value, type } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleLoginFormChange(e) {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      setMessage('Password and Confirm Password do not match.');
      return;
    }

    localStorage.setItem('sufcUserType', registerForm.userType);
    localStorage.setItem('sufcUserEmail', registerForm.email);

    setMessage('Account created successfully!');

    setTimeout(() => {
      setMode('login');
      setLoginForm((prev) => ({ ...prev, email: registerForm.email }));
      setMessage(null);
    }, 900);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('sufcUserEmail');
    const storedType = localStorage.getItem('sufcUserType');

    if (loginForm.email && loginForm.email === storedEmail) {
      if (storedType === 'recipient') {
        navigate('/recipient-dashboard');
      } else {
        navigate('/donor-dashboard');
      }
    } else {
      setMessage('Login failed: email not registered.');
    }
  };

  return (
    <div className="container">
      <div className="form-box login">
        <form id="loginForm" onSubmit={handleLogin}>
          <h1>Login</h1>
          <p className="form-subtitle">We've missed you. Log in to see your journey</p>
          <div className="input-box">
            <input id="loginEmail" name="email" type="email" placeholder="Email" value={loginForm.email} onChange={handleLoginFormChange} required />
            <i className='bx bxs-envelope'></i>
          </div>
          <div className="input-box">
            <input name="password" type="password" placeholder="Password" value={loginForm.password} onChange={handleLoginFormChange} required />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>

      <div className="form-box register">
        <form id="registerForm" onSubmit={handleRegister}>
          <h1>Create Your Account</h1>
          <p className="form-subtitle">Sign up as a donor or recipient to join the mission.</p>

          <div className="user-type-group">
            <span className="user-type-label">User Type</span>
            <div className="user-type-options">
              <label className="user-type-option">
                <input type="radio" name="userType" value="donor" checked={registerForm.userType === 'donor'} onChange={handleRegisterFormChange} required />
                <span>Donor</span>
              </label>
              <label className="user-type-option">
                <input type="radio" name="userType" value="recipient" checked={registerForm.userType === 'recipient'} onChange={handleRegisterFormChange} required />
                <span>Recipient</span>
              </label>
            </div>
          </div>

          <div className="grid-two-cols">
            <div className="input-box input-box--medium">
              <input name="firstName" type="text" placeholder="First Name" value={registerForm.firstName} onChange={handleRegisterFormChange} required />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box input-box--medium">
              <input name="lastName" type="text" placeholder="Last Name" value={registerForm.lastName} onChange={handleRegisterFormChange} required />
              <i className='bx bxs-user'></i>
            </div>
          </div>

          <div className="grid-two-cols">
            <div className="input-box select-wrapper">
              <select name="country" value={registerForm.country} onChange={handleRegisterFormChange} required>
                <option value="" disabled>Country</option>
                <option value="ph">🇵🇭 Philippines</option>
                <option value="us">🇺🇸 United States</option>
                <option value="ca">🇨🇦 Canada</option>
                <option value="gb">🇬🇧 United Kingdom</option>
                <option value="au">🇦🇺 Australia</option>
              </select>
              <i className='bx bx-world'></i>
            </div>
            <div className="input-box">
              <input name="region" type="text" placeholder="Region / Province" value={registerForm.region} onChange={handleRegisterFormChange} required />
              <i className='bx bxs-map'></i>
            </div>
          </div>

          <div className="grid-two-cols">
            <div className="input-box input-box--short">
              <input name="postalCode" type="text" placeholder="Postal Code" value={registerForm.postalCode} onChange={handleRegisterFormChange} required />
              <i className='bx bxs-home'></i>
            </div>
            <div className="input-box input-box--short">
              <input name="age" type="number" min="1" max="120" placeholder="Age" value={registerForm.age} onChange={handleRegisterFormChange} required />
              <i className='bx bx-time'></i>
            </div>
          </div>

          <div className="grid-two-cols">
            <div className="input-box select-wrapper input-box--medium">
              <select name="gender" value={registerForm.gender} onChange={handleRegisterFormChange} required>
                <option value="" disabled>Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary</option>
                <option value="prefer_not_say">Prefer not to say</option>
              </select>
              <i className='bx bx-user-circle'></i>
            </div>
            <div className="input-box input-box--medium">
              <input name="phone" type="tel" placeholder="Phone Number" value={registerForm.phone} onChange={handleRegisterFormChange} required />
              <i className='bx bxs-phone'></i>
            </div>
          </div>

          <div className="input-box input-box--long">
            <input id="registerEmail" name="email" type="email" placeholder="Email" value={registerForm.email} onChange={handleRegisterFormChange} required />
            <i className='bx bxs-envelope'></i>
          </div>

          <div className="grid-two-cols">
            <div className="input-box input-box--medium">
              <input name="password" type="password" placeholder="Password" value={registerForm.password} onChange={handleRegisterFormChange} required />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box input-box--medium">
              <input name="confirmPassword" type="password" placeholder="Confirm Password" value={registerForm.confirmPassword} onChange={handleRegisterFormChange} required />
              <i className='bx bxs-lock-alt'></i>
            </div>
          </div>

          <button type="submit" className="btn">Create Account</button>
        </form>
      </div>

      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account yet?</p>
          <button type="button" className="btn register-btn" onClick={() => setMode('register')}>Go to Register</button>
        </div>

        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already part of Strand Up for Cancer?</p>
          <button type="button" className="btn login-btn" onClick={() => setMode('login')}>Go to Login</button>
        </div>
      </div>

      {message && <div className="register-success-message">{message}</div>}
    </div>
  );
}

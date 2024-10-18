import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [name, setName] = useState('');
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,20}$/;
    return passwordRegex.test(password) && !/\s/.test(password);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    if (currentState === 'Sign Up') {
      if (name.length < 3) {
        alert('Username must be at least 3 letters long.');
        return;
      }

      const existingUser = users.find(user => user.name === name);
      const existingEmail = users.find(user => user.email === email);

      if (existingUser) {
        alert('Username already exists.');
        return;
      }

      if (existingEmail) {
        alert('Email already exists. Redirecting to Login.');
        setCurrentState('Login');
        setPassword('');
        setConfirmPassword('');
        return;
      }

      if (!validatePassword(password)) {
        alert('Password must be 6-20 characters long, contain no spaces, and have at least one special character.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }

      const signUpResponse = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (signUpResponse.ok) {
        navigate('/');
        alert('User signed up successfully!');
      } else {
        alert('Error signing up!');
      }

    } else if (currentState === 'Login') {
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        navigate('/');
        alert('Login successful!');
      } else {
        alert('Invalid email or password. Redirecting to Sign Up.');
        setCurrentState('Sign Up');
        setName('');
        setPassword('');
        setConfirmPassword('');
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[-90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>
          {currentState}
        </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : (
        <TextField
          type="text"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
      )}
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        type={showPassword ? 'text' : 'password'}
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {currentState === 'Sign Up' && (
        <TextField
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forget your password?</p>
        {currentState === 'Login' ?
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p> :
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;

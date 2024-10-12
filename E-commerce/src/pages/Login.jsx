//  import React, { useState } from 'react'
 
//  const Login = () => {

//   const[currentState,setCurrentState]=useState('Login');


//   const onSubmitHandler=async(event)=>{
//     event.preventDefault();
//   }

//    return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[-90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//         <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//           <p className='prata-regular text-3xl'>
//             {currentState}
//           </p>
//           <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//         </div>
//         {currentState==='Login'?'':<input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
//         <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
//         <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password'required/>

//         <div className='w-full flex justify-between text-sm mt-[-8px]'>
//           <p className='cursor-pointer'>Forget your password?</p>
//           {
//             currentState==='Login'
//             ?<p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
//             :<p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
//           }
//         </div>
//         <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
//     </form>
//    )
//  }
 
//  export default Login

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (currentState === 'Sign Up') {
      // Sign Up logic
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
      if (response.ok) {
        navigate('/');
        alert('User signed up successfully!');
      } else {
        alert('Error signing up!');
      }
    } else if (currentState === 'Login') {
      // Login logic
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const user = users.find(user => user.email === email && user.password === password);
      if (user) { 
       
        navigate('/');
        alert('Login successful!');
        
      } else {
        alert('Invalid email or password!');
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
        <input
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
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


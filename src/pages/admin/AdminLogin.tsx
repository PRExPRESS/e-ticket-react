import React, { useState } from 'react';
  // Adjust the path if necessary
import {  useLocation, useNavigate } from 'react-router-dom';

import toastr from 'toastr';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { AdminUserLogin } from '../../services/userService';



const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Error states for each field
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Email validation (simple regex for demonstration purposes)
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async () => {
    let valid = true;
    const from = location.state?.from?.pathname || '/admin'; 

    // Reset errors
    setEmailError(null);
    setPasswordError(null);

    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    // Password validation (min 6 characters for demonstration)
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    }

    if (valid) {
      // Submit form logic (e.g., API call, etc.)
      //console.log('Form submitted', { email, password });
      const response = await AdminUserLogin({ email, password });
      if (response.error) {
        const showErrorToast = () => {
          toastr.error(response.error.message,'', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          });
        };
        showErrorToast();
        setError(response.error.message);
        
      }
    if(response){
        //console.log(response);
        login(response );
        navigate(from, { replace: true }); 
      }
      //console.log(response.user);
    }
  };

  return (
    <div className="bg-gray-100 flex w-full h-screen items-center justify-center font-bebas  p-5">

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full h-auto">
        {/* Sign In Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In to Admin Panel</h2>
        <p className="text-center text-gray-600 mt-2">Welcome back! Please enter your email and password.</p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-1 text-center">{error}</p>}

        {/* Sign In Form */}
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div>
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Sign In Button */}
          <Button label="Sign In" onClick={handleSubmit} onTouchStart={handleSubmit} />
        </form>

        
      </div>
    </div>
  );
};

export default AdminLogin;

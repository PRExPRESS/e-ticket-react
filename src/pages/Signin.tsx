import React, { useState } from 'react';
import Input from '../components/Input';  // Adjust the path if necessary
import Button from '../components/Button';  // Adjust the path if necessary
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userLogin } from '../services/userService';
import toastr from 'toastr';
import { useAuth } from '../hooks/useAuth';


const SignIn: React.FC = () => {
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
    const from = location.state?.from?.pathname || '/'; 

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
      console.log('Form submitted', { email, password });
      const response = await userLogin({ email, password });
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
      if(response.status === 200){
        login(response.user as any);
        navigate(from, { replace: true }); 
      }
    }
  };

  return (
    <div className="bg-gray-100 flex pt-10 lg:items-center justify-center min-h-[70vh]">

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Sign In Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In to Your Account</h2>
        <p className="text-center text-gray-600 mt-2">Welcome back! Please enter your details.</p>

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

        {/* Don't have an account */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <Link to={'/signup'} className="text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

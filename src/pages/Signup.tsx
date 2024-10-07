import React, { useState } from 'react';
import Input from '../components/Input'; // Adjust path as necessary
import Button from '../components/Button'; // Adjust path as necessary
import { Link } from 'react-router-dom';
import { createUser } from '../services/userService';
import toastr from 'toastr';

const SignUp: React.FC = () => {
  // State for form fields
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [nic, setNic] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [popup, setPopup] = useState<boolean>(false);

  // Error states
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [nicError, setNicError] = useState<string | null>(null);

  // Email validation (basic)
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async() => {
    let isValid = true;

    // Reset error states
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setNicError(null);

    // Name validation
    if (name.trim() === '') {
      setNameError('Full name is required.');
      isValid = false;
    }

    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    }

    // nic validation
    if (nic.trim() === '') {
      setNicError('NIC is required.');
      
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (isValid) {
      // Submit form 
      const response = await createUser({ name, email, phone, role: 'client', nic, password });

      if (response.error) {
          toastr.error(response.error.message, '', {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          });
      }
      setPopup(true);
      

    }
  };



  return (
    <div className="bg-gray-100 flex lg:items-center justify-center  lg:py-10">

      {popup && (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 inset-0 bg-black bg-opacity-50'>
          <div className="flex items-center justify-center min-h-screen">
            {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up Successful</h2>
              <p className="text-center text-gray-600 mt-2">Please verify your email address make sure you check your spam folder.</p>
              <div className="flex justify-center mt-4">
                <Button
                  label="Close"
                  onClick={() => {
                    setPopup(false);
                    window.location.href = "/login";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
        
        
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Sign Up Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-center text-gray-600 mt-2">Join us and manage your tasks efficiently.</p>

        {/* Sign Up Form */}
        <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div>
            <Input
              id="name"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

          {/* Email */}
          <div>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Phone */}
          <div>
            <Input
              id="phone"
              label="Phone (Optional)"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* NIC */}
          <div>
            <Input
              id="nic"
              label="NIC "
              type="text"
              placeholder="Enter your NIC Number" 
              value={nic}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNic(e.target.value)}
            />
            {nicError && <p className="text-red-500 text-sm mt-1">{nicError}</p>}
          </div>

          {/* Password */}
          <div>
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
          </div>

          {/* Sign Up Button */}
          <Button label="Sign Up" onClick={handleSubmit} />
        </form>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to={'/login'} className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

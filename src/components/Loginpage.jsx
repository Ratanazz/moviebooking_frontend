import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.email, formData.password);
      // If login succeeds, the AuthContext will handle navigation
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 p-6 rounded-lg shadow-md bg-gray">
        <h2 className="text-center text-2xl font-bold leading-9 ">
          Login to your account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5  border border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium ">
                Password
              </label>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-semibold text-red-500 hover:text-red-400">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/signin" className="text-red-500 font-semibold hover:text-red-400">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

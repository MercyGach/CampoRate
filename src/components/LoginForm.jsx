import React, { useState } from 'react';
import { login } from '../utils/APIRoutes';

const LoginForm = ({ onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await login(formData);
      localStorage.setItem('token', token);
      onLogin();
      onClose();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cream rounded-lg p-5 w-80">
        <h2 className="text-brown text-center mb-5 text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-light-brown mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-light-brown rounded p-2 mb-4"
          />
          <label className="text-light-brown mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-light-brown rounded p-2 mb-4"
          />
          <button
            type="submit"
            className="bg-light-brown text-cream border border-light-brown-dark hover:bg-cream hover:text-light-brown hover:border-light-brown-dark py-2 px-4 rounded mb-2 transition-colors duration-300"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-light-brown-dark text-cream border border-brown hover:bg-cream hover:text-light-brown-dark hover:border-brown py-2 px-4 rounded transition-colors duration-300"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
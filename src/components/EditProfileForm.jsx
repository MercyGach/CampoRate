import React, { useState } from 'react';
import { updateUserProfile } from '../utils/APIRoutes';

const EditProfileForm = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    university: user.university ? user.university._id : '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(formData);
      onUpdate(updatedUser);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-cream rounded-lg p-5 w-80">
        <h2 className="text-brown text-center mb-5 text-2xl font-bold">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-light-brown mb-1">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border border-light-brown rounded p-2 mb-4"
          />
          <label className="text-light-brown mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-light-brown rounded p-2 mb-4"
          />
          <label className="text-light-brown mb-1">University:</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            className="border border-light-brown rounded p-2 mb-4"
          />
          <button
            type="submit"
            className="bg-light-brown text-cream py-2 px-4 rounded mb-2 transition-colors duration-300 hover:bg-light-brown-dark"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-light-brown-dark text-cream py-2 px-4 rounded transition-colors duration-300 hover:bg-brown"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
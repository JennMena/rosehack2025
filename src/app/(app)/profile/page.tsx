'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

const ProfileSetup = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [socialStyle, setSocialStyle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const user = useUser();
  const email = user.user?.primaryEmailAddress || "";
  const name = user.user?.fullName || "";
  const userID = user.user?.id || "";

  // Handle resume file upload
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setResume(file);
  };

  // Handle social style selection
  const handleSocialStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSocialStyle(event.target.value);
  };

  // Save profile information
  const handleSave = () => {
    if (!resume || !socialStyle) {
      setMessage("Please fill out all fields.");
      return;
    }

    // Here you would typically send the data to the backend
    setMessage("Profile saved successfully!");
  };

  return (
    <div className="h-center w-center ">
      <div className="align-middle mb-2 text-center">
        <div className="inline-block transform scale-150">
          <UserButton />
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-center mb-7 mt-7">Welcome  {name}!</h2>

      {/* Resume upload */}
      <div className="mb-4">

        <label htmlFor="resume-upload" className="block text-lg font-medium text-gray-700">Upload Your Resume</label>
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* Social style preference */}
      <div className="mb-4">
        <label htmlFor="social-style" className="block text-lg font-medium text-gray-700">Select Your Social Interaction Style</label>
        <select
          id="social-style"
          value={socialStyle}
          onChange={handleSocialStyleChange}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">--Choose a style--</option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Confident">Confident</option>
          <option value="Empathetic">Empathetic</option>
          {/* Add more styles as needed */}
        </select>
      </div>

      {/* Save button */}
      <div className="mb-4">
        <button
          onClick={handleSave}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Save
        </button>
      </div>

      {/* Success/Error message */}
      {message && <p className="text-center text-lg text-red-500">{message}</p>}
    </div>
  );
};

export default ProfileSetup;

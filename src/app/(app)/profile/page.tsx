'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/firebaseConfig";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const ProfileSetup = () => {
  const [message, setMessage] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [resumeInput, setResumeInput] = useState<string>("");
  const [extractedResumeData, setExtractedResumeData] = useState<string>("");

  const user = useUser();
  const email = user.user?.primaryEmailAddress || "";
  const name = user.user?.firstName || "";
  const userID = user.user?.id || "";

  const db = getFirestore(app);
  const usersDataRef = collection(db, "usersData");


  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value);
  };

  const handleResumeInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeInput(event.target.value);
  };

  // Function to save the data to Firestore
  const saveInfoDB = async (extractedData: any) => {
    try {
      // Convert extracted data and textInput to the format that will be stored in Firestore
      const resumeData = {
        roles: extractedData.roles || [],
        overallJobTitle: extractedData.overallJobTitle || "",
        workExperience: extractedData.workExperience || [],
        skills: extractedData.skills || [],
        projects: extractedData.projects || [],
        interests: extractedData.interests || [],
        strengths: extractedData.strengths || "",
        weaknesses: extractedData.weaknesses || "",
      };

      // Save data to Firestore
      const userDocRef = doc(usersDataRef, userID);
      await setDoc(userDocRef, {
        resumeData,
        personalInfo: textInput, // Store the personal info (textInput)
        name,
      });

      console.log("SAVED TO DB")
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      setMessage("An error occurred while saving data.");
    }
  };

  const handleSave = async () => {
    if (!resumeInput || !textInput) {
      setMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch('/api/extract-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeContent: resumeInput }),
      });

      const data = await response.json();

      console.log(data);

      if (data.error) {
        setMessage('Failed to extract resume data.');
      } else {
        setExtractedResumeData(data.data); // Store the extracted resume data
        await saveInfoDB(data.data); // Save the extracted data to Firestore
      }
    } catch (error) {
      setMessage('An error occurred while extracting data.');
      console.error('Error:', error);
    }
    setMessage('Successfully extracted and saved your information.');
  };

  return (
    <div className="h-center w-center w-2/3 mx-auto ">
      <div className="align-middle mb-2 text-center">
        <div className="inline-block transform scale-150">
          <UserButton />
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-center mb-7 mt-7">Hi  {name}!</h2>

      {/* Onboarding message */}
      <div className="bg-[rgba(255,255,255,0.5)] p-6 rounded-lg shadow-md mb-6 ">
        <div className="flex items-center mb-3">
          <span className="text-red-500 text-lg font-bold">📌</span>
          <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-gray-100">Welcome to Your Onboarding</h3>
        </div>
        <div className="list-disc pl-6 text-gray-700 dark:text-gray-300">
          <p className="text-base">
            Tell us a bit about yourself to help us personalize your practice sessions and create the best experience for improving your social skills for your career goals.
          </p>
        </div>
      </div>


      {/* Personal preferences */}
      <div className="mb-3">
        <label htmlFor="social-style" className="block text-lg font-medium mb-2">
          Tell me a bit about yourself and your goals
        </label>
        <textarea
          onChange={handleTextInput}
          id="social-style"
          placeholder="Feel free to share any details about who you are, your interests, and what you'd like to work on in the social skills area."
          className="w-full p-3 border bg-[#e2ebad] dark:bg-[#444] rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 resize-none h-20 "
        ></textarea>
      </div>


      {/* Resume Content Upload */}
      <div className="mb-3">
        <label htmlFor="resume-upload" className="block text-lg font-medium mb-2">
          Upload your resume
        </label>
        <textarea
          onChange={handleResumeInput}
          id="resume-upload"
          placeholder="Paste the content of your resume here. Include your professional experience, skills, and achievements."
          className="w-full p-3  bg-[#e2ebad] dark:bg-[#444] border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 resize-none h-28 "
        ></textarea>
      </div>


      {/* Save button */}
      <div className="mb-4">
        <button
          onClick={handleSave}
          className="w-full py-2 bg-[hsl(30,69.1%,48.2%)] text-white rounded-md hover:bg-[hsl(30,66%,55%)] transition duration-200">
          Save
        </button>
      </div>

      {/* Success/Error message */}
      <div className="mb-3">
        {message && <p className="text-center text-lg text-red-500">{message}</p>}
      </div>

    </div>
  );
};

export default ProfileSetup;

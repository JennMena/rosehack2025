'use client';

import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/firebaseConfig";
import { collection, getFirestore } from "firebase/firestore";
import { extractPdfContent } from "@/app/api/extractText/route";

const ProfileSetup = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");

  const user = useUser();
  const email = user.user?.primaryEmailAddress || "";
  const name = user.user?.firstName || "";
  const userID = user.user?.id || "";

  const storage = getStorage(app);
  const db = getFirestore(app);
  const usersDataRef = collection(db, "usersData");
  const [resumeURL, setResumeURL] = useState<string>("");


  // Handle resume file upload
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setResume(file);
  };

  const uploadFileToStorage = async (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Create a reference to the location in storage
      const fileName = file.name + "-" + userID;
      const storageRef = ref(storage, 'uploads/' + fileName);

      // Upload the file
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle any errors during upload
          console.error(error);
          reject(error);
        },
        async () => {
          // Get the download URL when upload is complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  };

  // Handle social style selection
  const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value);
  };

  const handleSave = async () => {
    if (!resume || !textInput) {
      setMessage("Please fill out all fields.");
      return;
    }

    try {
      // Upload the file and get the URL
      const url = await uploadFileToStorage(resume);
      setResumeURL(url);
      console.log("Uploaded file URL:", url);

      // Extract and save PDF content via API route
      const response = await fetch('/api/extractText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileUrl: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to extract PDF content');
      }

      const data = await response.json();
      const pdfContent = data.text;
      console.log("Extracted PDF Content:", pdfContent);

      // Save to database (mocked below)
      // await addDoc(usersDataRef, { userID, email, resumeURL: url, socialStyle: textInput, pdfContent });
      setMessage("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Failed to save profile. Please try again.");
    }
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
          Tell me a bit about yourself and your social skills goals
        </label>
        <textarea
          onChange={handleTextInput}
          id="social-style"
          placeholder="Feel free to share any details about who you are, your interests, and what you'd like to work on in the social skills area."
          className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 resize-none h-20 "
        ></textarea>
      </div>


      {/* Resume upload */}
      <div className="mb-4">

        <label htmlFor="resume-upload" className="block text-lg font-medium">Upload Your Resume</label>
        <input
          type="file"
          id="resume-upload"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
        />
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
      {message && <p className="text-center text-lg text-red-500">{message}</p>}
    </div>
  );
};

export default ProfileSetup;

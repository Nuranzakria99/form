"use client";
import React, { useState } from "react";

// Define an interface for the form data
interface FormData {
  arrangement: string;
  question: string;
  question_ar: string;
  q_type: string;
  img_url: string
}

// Define a props interface for the InputField component
interface InputFieldProps {
  label: string;
  type: string;
  name: keyof FormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UrgentForm: React.FC = () => {
  // State to store form data with initial types
  const [formData, setFormData] = useState<FormData>({
    arrangement: "",
    question: "",
    question_ar: "",
    q_type: "",
    img_url: ""
  });

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault(); // Prevent default form submission
  
    // Send data to the server
    try {
      const response = await fetch(
        "http://localhost:3000/api/assessment/fetch/riasec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`); // Handle HTTP errors
      }
  
      // Only parse JSON if the response has content
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        alert(result.message || "Answer submitted"); // Display success alert
        console.log("Response from server:", result);
  
        // Reset the form data after successful submission
        setFormData({
          arrangement: "",
          question: "",
          question_ar: "",
          q_type: "",
          img_url: "",
        });
      } else {
        console.log("No JSON returned from response");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      alert("Failed to submit the answer."); // Optionally alert the user of an error
    }
  };
    return (
    <form onSubmit={handleSubmit} className="p-10">
      <h1 className="text-3xl font-bold">RIASEC Assessment Data Entry</h1>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Input fields updated to include onChange with TypeScript types */}
            <InputField
              label="Arrangement"
              type="number"
              name="arrangement"
              value={formData.arrangement}
              onChange={handleChange}
            />
            <InputField
              label="Occupation"
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
            />
            <InputField
              label="Occupation in Arabic"
              type="text"
              name="question_ar"
              value={formData.question_ar}
              onChange={handleChange}
            />
            <InputField
              label="Question Type (R - I - A - S - E - C)"
              type="text"
              name="q_type"
              value={formData.q_type}
              onChange={handleChange}
            />
            <InputField
              label="Image URL"
              type="text"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
            />
            <div className="sm:col-span-4">
              <button
                type="submit"
                className="rounded-md mt-8 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

export default UrgentForm;

"use client"
import React, { useState } from 'react';

// Define an interface for the form data
interface FormData {
  arrangment: string;
  question: string;
  question_ar: string;
  description: string;
  description_ar: string;
}

interface InputFieldProps {
    label: string;
    type: string;
    name: keyof FormData;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const UrgentForm2: React.FC = () => {
  // Initialize form data state with types specified
  const [formData, setFormData] = useState<FormData>({
    arrangment: '',
    question: '',
    question_ar: '',
    description: '',
    description_ar: ''
  });

  // Update form state based on input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault(); // Prevent default form behavior

    try {
      const response = await fetch('http://localhost:3000/api/assessment/fetch/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Optional: Parse JSON response only if response contains JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('Response from server:', result);
      } else {
        console.log('No JSON returned from response');
      }
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Inputs for each field with onChange to handle input */}
            {['arrangment', 'question', 'question_ar', 'description', 'description_ar'].map((name) => (
              <InputField
                key={name}
                label={capitalizeLabel(name.replace('_', ' '))}
                type="text"
                name={name as keyof FormData}
                value={formData[name as keyof FormData]}
                onChange={handleChange}
              />
            ))}
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

// Component for input fields
const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange }) => (
  <div className="sm:col-span-4">
    <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
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

// Helper function to capitalize label
function capitalizeLabel(label: string): string {
  return label.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default UrgentForm2;


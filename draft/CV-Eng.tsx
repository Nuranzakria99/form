'use client';
import Steper from '@/components/steper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const questions = [
  { question: 'Question 1' },
  { question: 'Question 2' },
  { question: 'Question 3' },
  { question: 'Question 4' },
];

interface OptionInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
const options = ['Always Valued', 'Often Valued', 'Sometimes Valued', 'Seldom Valued', 'Never Valued'];

const CareerValue: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    console.log(formData);
  }, [formData]);


  return (
    <>
      <Steper arrange={3} />
      <div className=' h-full overflow-scroll'>
        <div className='w-1/2 m-auto p-5'>
          <div className="mt-2">
            {questions.map((questionObj, index) => (
              <div key={index} className="mb-5">
                <h3 className="mb-1 font-semibold text-white">{questionObj.question}</h3>
                <ul className=" w-full text-sm font-medium text-whitebg-white rounded-lg sm:flex items-end  ">
                  {options.map((option, i) => (
                    <li key={i} className="w-full">
                      <div className="flex ps-3 text-center flex-col-reverse items-center  ">
                        <input
                          id={`question-${index}-${i}`}
                          name={`question-${index}`}
                          value={option}
                          type="radio"
                          className="w-4 h-4  appearance-none border border-black p-1 rounded-full checked:bg-[#fcaf48] checked:border-black bg-white"
                          checked={formData[`question-${index}`] === option}
                          onChange={(event) => setFormData(prevState => ({ ...prevState, [`question-${index}`]: event.target.value }))}
                        />
                        <label htmlFor={`question-${index}-${i}`} className="w-full py-2 ms-1 text-sm font-medium text-white">{option}</label>
                      </div>   
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className='text-center m-8'>
            <Link href='./ms' className="bg-[#06396e] text-white rounded-full py-2 px-3 text-center m-5 text-sm">Next
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerValue;
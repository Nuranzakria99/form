import React from 'react';
import { Icon } from '@iconify/react';

interface NextAssessmentProps {
  currentStepTitle: string; 
}

const NextAssessment: React.FC<NextAssessmentProps> = ({ currentStepTitle }) => { 
  return (
    <div className=' w-1/2 m-auto p-5 flex items-center flex-col mt-10'>
      <Icon icon="lets-icons:check-ring-light" width="150" height="150" className="text-green-500 rounded-full text-3xl" />        
      <h2 className='text-2xl mt-10 font-bold text-white'>Well Done, you have finished your {currentStepTitle} test</h2>
    </div>
  );
};

export default NextAssessment;

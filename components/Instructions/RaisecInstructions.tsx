import React from 'react';

interface Instruction {
  text: string;
}

interface RaisecInstructionsProps {
  instructions: Instruction[];
  currentIndex: number;
  onNext: () => void;
  onSkip: () => void;
}


const getInstructionClassName = (index: number): string => {
  switch (index) {
    case 0:
      return 'top-16 left-60 ';
    case 1:
      return 'top-96	 left-50 '; 
    default:
      return ''; 
  }
};


const RaisecInstructions: React.FC<RaisecInstructionsProps> = ({instructions, currentIndex, onNext, onSkip }) => {
  const instructionClassName = getInstructionClassName(currentIndex);
  const currentInstruction = instructions[currentIndex];
  

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-75">
    <div className="relative w-full">

      <div className={`flex-col absolute  w-full h-full flex items-center ${instructionClassName}`}>
        <div className="bg-white z-30  p-5 w-2/6 mb-6 rounded-full border border-black text-center">
          <p>{currentInstruction.text}</p>
        </div>
        <div className="flex flex-row">
          <button className="bg-blue-500 text-white rounded-full py-2 px-4 ml-4" onClick={onNext}>
          حسنا          </button>
          <button className="bg-gray-400 text-white rounded-full py-2 px-4" onClick={onSkip}>
          تخطي البرنامج التعليمي   
                 </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RaisecInstructions;

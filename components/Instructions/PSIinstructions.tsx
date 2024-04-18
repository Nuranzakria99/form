import React from 'react';

interface Instruction {
  text: string;
}

interface PSIinstructionsProps {
  instructions: Instruction[];
  currentIndex: number;
  onNext: () => void;
  onSkip: () => void;
}

const PSIinstructions: React.FC<PSIinstructionsProps> = ({ instructions, currentIndex, onNext, onSkip }) => {
  const currentInstruction = instructions[currentIndex];

  const getInstructionClassName = (index: number): string => {
    switch (index) {
      case 0:
        return 'top-16 right-60 ';
      case 1:
        return 'top-96	 right-32 '; 
      case 2:
        return 'top-96	 right-50 '; 
      default:
        return ''; 
    }
  };

  const instructionClassName = getInstructionClassName(currentIndex);

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full bg-black bg-opacity-75">
      <div className="relative w-full">

        <div className={`flex-col absolute  w-full h-full flex items-center ${instructionClassName}`}>
          <div className="bg-white z-30  p-5 w-2/6 mb-6 rounded-full border border-black text-center">
            <p>{currentInstruction.text}</p>
          </div>
          <div className="flex flex-row">
            <button className="text-white rounded-full py-2 px-4 mr-4 bg-custom-gradient4" onClick={onNext}>
              Next
            </button>
            <button className="bg-gray-400 text-white rounded-full py-2 px-4" onClick={onSkip}>
              Skip Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PSIinstructions;

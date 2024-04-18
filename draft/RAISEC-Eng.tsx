'use client';
import React, { useState } from 'react';
import Steper from '@/components/steper';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import RaisecInstructions from '@/components/Instructions/RaisecInstructions';

interface Item {
  id: number;
  title: string;
  imageSrc: string;
  selected: 0 | 1 | null; 
}

const items: Item[] = [
  { id: 1, title: "Riasec Assessment Introduction", imageSrc: "/images/image1.jpg", selected: null },
  { id: 2, title: "Riasec Assessment Introduction", imageSrc: "/images/image2.jpg", selected: null },
  { id: 3, title: "Riasec Assessment Introduction", imageSrc: "/images/image3.jpg", selected: null },
  { id: 4, title: "Riasec Assessment Introduction", imageSrc: "/images/image4.jpg", selected: null },
];
const Riasec = () => {
  const [showInstructions, setShowInstructions] = useState<boolean>(true); 
  const [instructionIndex, setInstructionIndex] = useState<number | null>(0);
  const [itemsState, setItemsState] = useState(items);


  const handleIconClick = (itemId: number, selected: 0 | 1) => { 
    const updatedItems = itemsState.map(item => {
      if (item.id === itemId) {
        return { ...item, selected: selected };
      } else {
        return item;
      }
    });
    setItemsState(updatedItems);
  };

  
  const handleNext = () => {
    if (instructionIndex !== null && instructionIndex < instructions.length - 1) {
      setInstructionIndex((currentIndex) => (currentIndex !== null ? currentIndex + 1 : 0));
    } else {
      setShowInstructions(false);
    }
  };
  
  const handleSkip = () => {
    setShowInstructions(false); 
    setInstructionIndex(null);
  };
  
  const instructions = [
    { text: "Select whether you agree or disagree with each statement." },
    { text: "If you are done, click next assessment button to continue the assessment" }  ];

  return (
  <>
    <Steper arrange={2} />
      <div className='bg-custom-gradient4 h-full overflow-scroll'>
        {showInstructions && (<RaisecInstructions instructions={instructions}  currentIndex={instructionIndex ?? 0} onNext={handleNext} onSkip={handleSkip} /> )}
        <div className=' w-1/2 m-auto py-5'>
          <div className="container mx-auto">
            {itemsState.map((item) => (
              <div className="flex flex-row justify-between items-center mb-4" key={item.id}>
                <div className="flex flex-col">
                  <h2 className="text-md font-semibold text-white">{item.title}</h2>
                  <div className="flex flex-row mt-2  ">
                    <div className={` mr-2 cursor-pointer rounded-full ${instructionIndex === 0 ? 'z-20 bg-white text-black' : 'text-white '}  ${item.selected === 1 ? ' bg-[#fcaf48] text-white' : ''}`} onClick={() => handleIconClick(item.id, 1)}>
                      <Icon icon="lucide:circle-check-big" width="32" height="32" />
                    </div>
                    <div className={`cursor-pointer rounded-full ${instructionIndex === 0 ? 'z-20 bg-white text-black' : 'text-white '}   ${item.selected === 0 ? ' bg-[#fcaf48] text-white' : ''}`} onClick={() => handleIconClick(item.id, 0)}>
                      <Icon icon="lucide:circle-x" width="32" height="32" />
                    </div>
                  </div>
                </div> 
                <div >
                  <img src={item.imageSrc} alt={item.title} className="w-32 h-32" />
                </div>
              </div>
            ))}
          </div>
          <div className='text-center'>
            <Link href={`./cv`} className="bg-[#06396e] text-white rounded-full py-2 px-3 text-center text-sm m-auto" >Next Assessment
            </Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default Riasec;

"use client";
import React, { useState, useEffect } from "react";
import { Steps } from "antd";
type Step = {
  title: string;
  description?: string;
};

type AppProps = {
  arrange: number;
};

const Steper: React.FC<AppProps> = ({ arrange }) => {
  const [current, setCurrent] = useState(0);

  const steps: Step[] = [
    {
      title: "Introduction",
    },
    {
      title: "PSI",
    },
    {
      title: "RIASEC",
    },
    {
      title: "CV",
    },
    {
      title: "MS",
    },
    {
      title: "Next Step",
    },
  ];

  useEffect(() => {
    setCurrent(arrange);
  }, [arrange]);

  return (
    <>
   

      <Steps current={current} className="pt-6 pb-2 " labelPlacement="vertical">
        {steps.map((step, index) => (
          <Steps.Step
            key={index}
            title={
              <div className="text-white">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            }
          />
        ))}
      </Steps>
      <h2 className="text-center text-2xl font-bold mb-4 mt-2 text-white">
        {steps[current].title}
      </h2>

    </>
  );
};

export default Steper;

import React from 'react';
import CTAButton from './Button';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
     
      <div className='w-[50%] flex flex-col gap-8'> 
        <h2 className='text-4xl'>{heading}</h2>
        <div className='text-richblack-300 font-bold'>{subheading}</div>
        <div className='flex gap-4'>
          {ctabtn1 && (
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
              <div className='flex gap-2 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight />
              </div>
            </CTAButton>
          )}
          {ctabtn2 && (
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              <div className='flex gap-2 items-center'>
                {ctabtn2.btnText}
                <FaArrowRight />
              </div>
            </CTAButton>
          )}
        </div>
      </div >
      {/* {SECTION 2} */}
      <div className={`h-fit flex flex-row text-[10] w-full py-4 ${backgroundGradient}`}>
      <div className='text-center w-10 flex flex-col text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className={`w-[90] flex flex-col gap-2 font-bold font-mono ${codeColor}`}>
           <TypeAnimation
            sequence={[codeblock,50000,""]}
            repeat={Infinity}
            cursor={true}
            style={{
                whiteSpace: "pre-line",
                display:"block",
            }}
           />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;

import React from 'react'
import HighlightText from "../HomePage/HighlightText"
import know_your_growth from "../../../assets/Images/Know_your_progress.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button";

import compare_with_others from "../../../assets/Images/Compare_with_others.png"

export const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-5 mt-[130px] items-center mb-32'>
        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for 
          <HighlightText text='Learning Any Languages' />
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
          Using spin making learning language easy. with 20+ languages realistic voice-over, 
          progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
          <img 
          src={know_your_growth}
          alt='know_your_growth'
          className='object-contain -mr-32'
          >
          </img>

          <img 
          src={compare_with_others}
          alt='compare_with_others'
          className='object-contain'>
           
          </img>
          
          <img src={plan_your_lesson}
          alt='plan_your_lesson'
          className='object-contain -ml-32'>
          </img>

        </div>

        <div className='w-fit'>
          <CTAButton active={true} linkto={"/signup"}>
          <div>
            Learn More
          </div>
          </CTAButton>
        </div>
    </div>
  )
}

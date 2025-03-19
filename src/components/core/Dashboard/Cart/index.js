import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RenderCartCourses } from './RenderCartCourses';
import { RenderTotalAmount } from './RenderTotalAmount';

export const Cart = () => {
    const {total,totalItems} = useSelector((state)=> state.auth);
  return (
    <div className='text-white'>
        <h1>Your Courses</h1>
        <p>{totalItems} courses in cart</p>

        {
            total > 0 ?
            (<div>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div>)
            :
            <p>No courses in cart</p>

 
        }
    </div>
  )
}

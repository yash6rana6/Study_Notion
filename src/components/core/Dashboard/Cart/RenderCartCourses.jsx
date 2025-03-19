import React from 'react'
import { IoStarOutline} from 'react-icons/io5';
import {  RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import {removeFromCart} from "../../../../slices/cartSlice"

export const RenderCartCourses = () => {

    const { cart } = useSelector( (state) => state.cart);
    const dispatch = useDispatch();
  return (
    <div>
        {
            cart.map((course, index) => (
                <div key={index}>
                    <div>
                        <img src={course?.thumbnail}/>
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.categoryName}</p>
                            <div>
                                <span>4.8</span>
                                <ReactStars 
                                count={5}
                                size={20}
                                value={course?.rating || 0}
                                edit={false}
                                activeColor={'#ffd700'} 
                                emptyIcon={<IoStarOutline/>}
                                fullIcon={<IoStarOutline/>}
                                />
                                <span>{course?.ratingReviews?.length}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={ () => dispatch(removeFromCart(course._id))}>
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>
                    <p>{course?.price}</p>
                </div>
            ))
        }
    </div>
  )
}

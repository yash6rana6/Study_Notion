import React from 'react'
import { useSelector } from 'react-redux'
import { IconBtn } from '../../../common/IconBtn'

export const RenderTotalAmount = () => {
  const {total,cart} = useSelector( (state) => state.total)

  const handleBuyCourse = () => {
    const courses = cart.map( (course) => course.id)
    console.log("Bought these courses",courses);
    // Api = Paytm gateway setup karna h yr
  }
  return (
    <div>
      <p>total</p>
      <p>Rs {total}</p>
      <IconBtn 
      text="Buy Now"
      onClick={handleBuyCourse}
      customClasses={"w-full justify-center"}
      />
    </div>
  )
}

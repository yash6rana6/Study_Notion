import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../Services/operations/courseDetailsAPI"
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

export const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValue,
        formState: { errors },
      } = useForm();
    
      const dispatch = useDispatch();

      const courseState = useSelector((state) => state.course); 
      const { course, step, editCourse, paymentLoading } = courseState || {}; 
      const [loading, setLoading] = useState(false);
      const [ courseCategories, setCourseCategories] = useState([]);
    
      useEffect(() => {
         const getCategories = async() => {
          setLoading(true);
          try {
             const categories = await fetchCourseCategories();
             if(categories.length > 0) {
              setCourseCategories(categories);
             }
          } catch (error) {
             console.error(error);
          }
          setLoading(false);
         }

         if (editCourse) {
          setValue("courseTitle", course.courseName)
          setValue("courseShortDesc", course.courseDescription)
          setValue("coursePrice", course.price)
          setValue("courseTags", course.tag)
          setValue("courseBenefits", course.whatYouWillLearn)
          setValue("courseCategory", course.category)
          setValue("courseRequirements", course.instructions)
          setValue("courseImage", course.thumbnail)
        }
        getCategories()

      })

      const onSubmit = async() => {}
  return (
<form onSubmit={handleSubmit(onSubmit)} 
className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'
>

<div>
  <label htmlFor='courseTitle'>Course Title<sup>*</sup></label>
  <input  
  id='courseTitle'
  placeholder='Enter course title'
  {...register("courseTitle",{reqired:true})}
  className='w-full'
  />
  {errors.courseTitle && <span className='text-red-500'>This field is required.</span>}
</div>

<div>
  <label htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
  <textarea  
  id='courseShortDesc'
  placeholder='Enter course description'
  {...register("courseShortDesc",{reqired:true})}
  className='w-full h-48'
  />
  {errors.courseShortDesc && <span className='text-red-500'>This field is required.</span>}
</div>

<div>
  <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
  <input  
  id='coursePrice'
  placeholder='Enter course Price'
  {...register("coursePrice",{
    reqired:true,
    valueAsNumber:true,
  })}
  className='w-full'
  />
  <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-200'/>
  {errors.courseprice && <span className='text-red-500'>This field is required.</span>}
</div>

<div>
  <label htmlFor='courseCategory'>Course CATAGORIES<sup>*</sup></label>
  <select 
  id='courseCategory'
  {...register("courseCategory",{reqired:true})}
  defaultValue=""
  >
    <option value="" disabled>Choose a category</option>
    {
      loading && courseCategories.map( (category,index) =>{
        return <option key={index} value={category.id}>{category.name}</option>
      })
    }
  </select> 
  {errors.courseprice && <span className='text-red-500'>This field is required.</span>}
</div>

</form>
  )
}

import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../api"
// import { updateCompletedLectures } from "../../slices/viewCourseSlice"
import { setLoading } from "../../slices/profileSlice";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints

export const getAllCourses = async() => {
    const toastId = toast.loading('Loading...',
        {id: 'loading',});

    let result = []

    try {
        const response = await apiConnector("GET",GET_ALL_COURSE_API);
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories");
        }

        result = response?.data?.data;
    } catch (error) {
        console.error("Error fetching Course Categories", error);
        toast.error(error.message)
        
    }
   toast.dismiss(toastId);
   return result;
    
}

export const fetchCourseDetails = async(courseId) => {
    const toastId = toast.loading('Loading...',
        {id:'loading'}
    );

    let result = null;
    try {
        const response = await apiConnector("GET",COURSE_DETAILS_API, 
            {courseId}
        );
        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories");
        }

        result = response?.data;

    } catch (error) {
        console.error("Error fetching Course Details", error);
        toast.error(error.message)
        
    }
    toast.dismiss(toastId);
    return result;
};

export const fetchCourseCategories = async (courseId) => {
    const toastId = toast.loading('Loading...',
        {id:'loading'}
    );

    let result = [];
    try {
        const response = await apiConnector("GET",  COURSE_CATEGORIES_API)

        if(!response?.data?.success){
            throw new Error("Could Not Fetch Course Categories");
        }

        result = response?.data;
    } catch (error) {
        console.error("Error fetching Course Details", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}
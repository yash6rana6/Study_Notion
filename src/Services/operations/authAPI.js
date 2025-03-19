import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
// import { resetCart } from "../../slices/cartSlice"
import  {setUser}  from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector";
import { endpoints } from "../api";

const { SENDOTP_API, SIGNUP_API, LOGIN_API,CHANGE_PASSWORD_API ,RESETPASSTOKEN_API,   RESETPASSWORD_API} = endpoints;


export function sendOtp(email, navigate) {
  return async (dispatch) => {
      const toastId = toast.loading('Loading...', { id: 'loading' });
      dispatch(setLoading(true));

      try {
          const response = await apiConnector("POST", SENDOTP_API, {
              email,
              checkUserPresent: true,
          });
          console.log("SENDOTP API RESPONSE:", response);

          if (!response.data.success) {
              throw new Error(response.data.message);
          }

          toast.success("OTP Sent Successfully");
          if (navigate && typeof navigate === "function") {
              navigate("/verify-email");
          }
      } catch (error) {
          console.error("SENDOTP API ERROR:", error);
          toast.error("Could Not Send OTP");
      } finally {
          dispatch(setLoading(false));
          toast.dismiss(toastId);
      }
  };
}


  export function getPasswordResetToken(email, setEmailSent){
    return async (dispatch) =>{
       dispatch(setLoading(true))
       try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API,{email});
        console.log("GET PASSWORD RESET TOKEN API RESPONSE............", response)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        toast.success("Reset Password Token Sent Successfully")
        setEmailSent(true)

       } catch (error) {
        console.log("Reserve Password Token error", error);
        toast.error("Error while sending reset password token");
       }
       dispatch(setLoading(false));
    }
  }

  export function resetPassword(password,confirmPassword,token){
    return async (dispatch) =>{
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST",   RESETPASSWORD_API ,{password,confirmPassword,token});
        console.log("Password has been changed.....",response);

        if(!response.data.success) {
         throw new Error(response.data.message);
        }

        toast.success("Password has been changed");
      } catch (error) {
        console.log("Reset password change error: " + error);
        toast.error("Error while reset password");
      }
      dispatch(setLoading(false));
    }
  } 


  export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
       const toastId = toast.loading('Loading...', {
      id: 'loading',
    });
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        })
  
        console.log("SIGNUP API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
  
  export function login(email, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading((<div className="loader"></div>), { id: "loading" });
  
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", LOGIN_API, { email, password });
  
        console.log("LOGIN API RESPONSE............", response);
  
        if (!response?.success) { 
          throw new Error(response?.message || "Login failed");
        }
  
        toast.success("Login Successful");
        dispatch(setToken(response.token));
  
        const userImage = response.user?.image || 
          `https://api.dicebear.com/5.x/initials/svg?seed=${response.user.firstName} ${response.user.lastName}`;
  
        dispatch(setUser({ ...response.user, image: userImage }));
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("user", JSON.stringify(response.user));
        
        navigate("/dashboard/my-profile");
      } catch (error) {
        console.log("LOGIN API ERROR............", error);
        toast.error(error.message || "Login Failed");
      }
  
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    };
  }
  

  export function logout(navigate) {
    return (dispatch)=> {
      // dispatch(resetCart())
      dispatch(setUser(null))
      dispatch(setToken(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate("/login")
      toast.success("Logged Out Successfully")
    }
  }
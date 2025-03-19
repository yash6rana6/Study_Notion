import React from "react";
import { IoLogoWechat } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { IoMdGlobe } from "react-icons/io";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
import Footer from "../components/common/Footer";

export const ContactUs = () => {
  return (
    <div className=" text-white">
      <div className="flex gap-10 rounded-xl bg-richblack-800 p-4 lg:p-6 ">
        <div className="ml-20 mr-20 font-semibold">
          <div className="flex flex-col gap-2">
            <div  className="text-2xl flex gap-2">
            <IoLogoWechat />
            <h2>Chat on us</h2>
            </div>
            <div>
            <p>Our friendly team is here to help</p>
            <p>info@stdynotion.com</p>
            </div>
          </div>

          <div>
            <div className="text-2xl flex gap-2">
            <IoMdGlobe />
            <h2>Visit us</h2>
            </div>
           <div>
             <p>Come and say hello at our office HQ.</p>
            <p>
              Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
              Bangalore-560016
            </p>
           </div>
          </div>

          <div>
            <div  className="text-2xl flex gap-2">
            <IoCall />
            <h2>Call Us</h2>
            </div>
            <p>Mon - Fri From 8am to 5pm</p>
            <p>+123 456 7869</p>
          </div>
        </div>

        <div>
          <h1> Got a idea? We ve got the </h1>
          <h1>Let team up</h1>
          <p>Tell us more about and what you re got in mind</p>
          <div>
            <ContactUsForm />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

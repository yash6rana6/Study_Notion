import React from "react";
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import  ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useState,useEffect } from "react";
import { categories } from "../../Services/api";
import apiConnector from "../../Services/apiConnector";
import { RiArrowDownSFill } from "react-icons/ri";


const subLink = [
  {
    title: "pythons",
    link:"/category/python"
  },
  {
    title: "web dev",
    link:"/category/web-development"
  }

]

export const Navbar = () => {
  const { token } = useSelector((state) => state.auth ||{});
  console.log("token =>",token);
  const { user } = useSelector((state) => state.profile ||{});
  console.log("User Navbar =>",user);
  const { totalItems } = useSelector((state) => state.totalItems||{});
  // const [subLink, setSubLink ] = useState([]);

  // const fetchSubcategory =  async() => {
  //   try {
  //     const result = await apiConnector("GET", categories);
  //     console.log("Result",result);
  //     // setSubLink(result.data.data);
  //   } catch (error) {
  //     console.log("Error fetching category", error);
  //   }
  //  }
  
  
  useEffect(() => {
      // fetchSubcategory();
  },[])



  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div>
      <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              width={160}
              height={42}
              loading="lazy"
            ></img>
          </Link>

          {/* Nav Links */}
          <nav>
            <ul className="flex text-richblack-25 gap-x-6">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                  <div className="flex items-center gap-2 group relative">
                      <div>{link.title}</div>
                       <RiArrowDownSFill />
                       <div className="invisible left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblue-900
                       translate-x-[-50%] translate-y-[50%]
                       opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px]
                       absolute">

                        <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 
                        translate-x-[80%] translate-y-[-10%]
                        bg-richblack-5">

                          </div>
                          {
                              subLink.length ? (
                                <div>
                                {subLink.map((link, index) => (
                                  <Link to={link.link} key={index}>
                                    <p>{link.title}</p>
                                  </Link>
                                ))}
                              </div>
                              ) : (<div></div>)
                          }

                       </div>
                  </div>
                  ) : (
                    <div>
                      <Link to={link?.path}>
                        <p
                          className={`${
                            matchRoute(link.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }`}
                        >
                          {link.title}
                        </p>
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Login/signUp/Dashboard*/}
          <div className="flex gap-x-4 items-center">
            <AiOutlineShoppingCart/>
            {user?.accountType === "Instructor" && (
              <Link to="/dashboard/cart">
                {totalItems > 0 && <span>{totalItems}</span>}
              </Link>
            )}
            {
              token === null && (
                <Link to="/login">
                  <button className="border border-richblack-700 bg-richblack-800
                  px-[12px] py-[8px] text-richblack-100 rounded-md ">Login</button>
                </Link>
              )
            }
            {
              token === null && (
                <Link to="/signup">
                  <button className="border border-richblack-700 bg-richblack-800
                  px-[12px] py-[8px] text-richblack-100 rounded-md ">Sign up</button>
                </Link>
              )
            }
            {
              token !== null && <ProfileDropDown/>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

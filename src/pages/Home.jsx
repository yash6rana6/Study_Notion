import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import "../App.css";
import { TimeLineSection } from "../components/core/HomePage/TimeLineSection";
import { LearningLanguageSection } from "../components/core/HomePage/LearningLanguageSection";
import { InstructorSection } from "../components/core/HomePage/InstructorSection";
import Footer  from "../components/common/Footer";
import { ExploreMore } from "../components/core/HomePage/ExploreMore";


export const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group p-1 mt-16 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center rounded-full px-10 py-[5px] group-hover:bg-richblack-900 gap-2 ">
              <p>Become an instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future With
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
          With our online courses, you can learn at your own pace, from anywhere
          in the world, and get access to a wealth of resources, including
          hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a demo
          </CTAButton>
        </div>

        <div className="shadow-blue-200 mx-3 my-10">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4"></source>
          </video>
        </div>

        <div>
          <div className="bg-gradient-to-r from-yellow-300 to-amber-100 w-10/12 rounded-full"></div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div>
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              <div>
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </div>
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width">\n</head>\n<body>\n<h1>Welcome to My Website</h1>\n <p>This is a simple HTML example.</p>\n</body>\n</html>`}
            backgroundGradient={"bg-gradient-to-r from-gray-700 to-gray-900"}
            codeColor={"text-yellow-200"}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div>
                Unlock Your
                <HighlightText text={"coding potential"} />
              </div>
            }
            subheading={
              <div>
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </div>
            }
            ctabtn1={{
              btnText: "Try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width">\n</head>\n<body>\n<h1>Welcome to My Website</h1>\n <p>This is a simple HTML example.</p>\n</body>\n</html>`}
            backgroundGradient={"bg-gradient-to-r from-gray-700 to-gray-900"}
            codeColor={"text-yellow-200"}
          />
        </div>
        <div>
        <ExploreMore/>
      </div>
      </div>
     

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-500">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex items-center gap-5 mx-auto flex-col">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"login"}>
                <div className="flex items-center gap-3">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-maxContent w-11/12 flex flex-col items-center justify-between">
          <div className="flex flex-row gap-5 mb-10 mt-10">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The mordern study notion is the dictates its own terms. Today,
                to be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-richblack-900 text-white">
          <InstructorSection/>
          <h2 className="text-center text-4xl font-semibold mt-10">Reveiw From Other Learners</h2>
          {/* Review Slider Here */}
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

import React, { useState } from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import HomePageEXplore from "../../../data/homepage-explore";
import  CourseCard  from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

export const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [course, setCourses] = useState(HomePageEXplore[0].courses);

  const [currentCard, setCurrentCard] = useState(
    HomePageEXplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageEXplore.filter((course) => course.tag === value);

    setCourses(result[0].courses);
    setCurrentCard(result[0].heading);
  };
  return (
    <div>
      <div className="text-4xl text-center text-white">
        Unlock the
        <HighlightText text={"Power of code"} />
      </div>
      <p className="text-center text-richblack-300 text-[16px] mt-3">
        Learn to build anything you can imagine
      </p>

      <div className="flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 mt-5 py-1 px-1">
        {tabName.map((element, index) => {
          return (
            <div
              className={`text-[16px] flex flex-row item-center gap-2
                ${
                  currentTab === element
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200 "
                } rounded-full transition-all duration-200 cursor-pointer
                  hover:bg-richblack-900 hover:text-richblue-5 px-7 py-2`}
              key={index}
              onClick={() => setMyCard(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className="lg:h-[150px]">
        <div className="flex absolute flex-row gap-10 justify-between w-full">
          {
          course.map((element, index) => {
            return (
              <div  key={index}>
                <CourseCard
                  cardData={element}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

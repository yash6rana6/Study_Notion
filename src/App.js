import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import { About } from "./pages/About";
import { Navbar } from "./components/common/Navbar";
import { ContactUs } from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import OpenRoute from "./components/core/Auth/OpenRoute";
import { PrivateRoute } from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import { Dashboard } from "./pages/Dashboard";
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/Settings/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { Cart } from "./components/core/Dashboard/Cart/index";
import { useDispatch, useSelector } from "react-redux";
import { AddCourses } from "./components/core/Dashboard/AddCourse";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inte">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route
          path="/about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <OpenRoute>
              <ContactUs />
            </OpenRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
          {/* temporary rendering */}
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="add-course" element={<AddCourses />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="cart" element={<Cart />} />
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<AddCourses />} />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

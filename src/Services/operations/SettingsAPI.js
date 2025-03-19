import { settingsEndpoints } from "../api";
import toast from "react-hot-toast";
import { logout } from "./authAPI";
import setUser from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

// Update Display Picture
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating display picture...");

    try {
      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE:", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      dispatch(setUser(response.data));
      toast.success("Display picture updated successfully!");
    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE_API ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to update display picture.");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// Update Profile
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating your profile...");

    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      console.log("UPDATE_PROFILE_API RESPONSE:", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      const updatedUser = response.updatedUserDetails;
      updatedUser.image = updatedUser.image || `https://api.dicebear.com/9.x/bottts/svg?seed=${updatedUser.firstName} ${updatedUser.lastName}`;

      dispatch(setUser(updatedUser));
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("UPDATE_PROFILE_API ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// Change Password
export function changePassword(token, currentPassword, newPassword) {
  return async () => {
    const toastId = toast.loading("Changing password...");

    try {
      const response = await apiConnector("PUT", CHANGE_PASSWORD_API, { currentPassword, newPassword }, {
        Authorization: `Bearer ${token}`,
      });

      console.log("CHANGE_PASSWORD_API RESPONSE:", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("CHANGE_PASSWORD_API ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to change password.");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

// Delete Profile
export function deleteProfile(token) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting profile...");

    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("DELETE_PROFILE_API RESPONSE:", response);

      if (!response.success) {
        throw new Error(response.message);
      }

      dispatch(logout());
      toast.success("Profile deleted successfully!");
    } catch (error) {
      console.error("DELETE_PROFILE_API ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to delete profile.");
    } finally {
      toast.dismiss(toastId);
    }
  };
}

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(`Error in checkAuth in useAuthStore : ${error}`);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: data });
      toast.success("Account created Successfully!");
    } catch (error) {
      console.log(`Error in signup in useAuthStore! : ${error}`);
      toast.error("Error in SignUp!");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in Successfully!");
    } catch (error) {
      console.log(`Error in login in useAuthStore! : ${error}`);
      toast.error(`${error}`);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged Out Successfully!");
    } catch (e) {
      console.log(`Error in logout in useAuthStore! : ${error}`);
      toast.error("Error in Logout!");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Pic updated Successfully!");
    } catch (error) {
      console.log(`Error in updateProfile in useAuthStore! : ${error}`);
      toast.error("Error Updating Profile Picture!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));

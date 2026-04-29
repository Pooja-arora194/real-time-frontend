import { create } from "zustand";
import {
  fetchProjectListApi,
  fetchUserApi,
  fetchUserListApi,
  loginApi,
  registerApi,
} from "../api/authApi";

export const useAuthStore = create((set) => ({
  user: null,
  loginUser: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: "",
  userList: [],
  projectList: [],

  // 🔐 REGISTER
  register: async (data, navigate) => {
    try {
      set({ loading: true, error: "" });

      const res = await registerApi(data);

      set({
        user: res.data.user,
        loading: false,
      });

      return true;
    } catch (e) {
      set({
        loading: false,
        error: "Register failed",
      });
      return false;
    }
  },

  // 🔑 LOGIN
  login: async (data, navigate) => {
    try {
      set({ loading: true, error: "" });

      const res = await loginApi(data);

      localStorage.setItem("token", res.data.token);

      set({
        token: res.data.token,
        loading: false,
        user: res.data.user,
      });

      if (navigate) navigate("/projects");

      return {
        token: res.data.token,
        user: res.data.user,
      };
    } catch (e) {
      set({
        loading: false,
        error: "Login failed",
      });
      return false;
    }
  },

  // 🚪 LOGOUT
  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });
  },
  fetchUser: async () => {
    try {
      const res = await fetchUserApi();
      set({ loginUser: res.data });
    } catch {
      set({ loginUser: null });
    }
  },
  fetchUsers: async () => {
    const res = await fetchUserListApi();
    set({ userList: res.data });
  },
  fetchProjects: async () => {
    const res = await fetchProjectListApi();
    console.log(res, "fdjgdfjghjfgjhfd");
    set({ projectList: res.data });
  },
}));

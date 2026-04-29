import { create } from "zustand";
import client from "../api/client";
export const useAdminStore = create((set) => ({
  projects: [],
  tasks: [],
  users: [],
  loading: false,

  fetchData: async () => {
    set({ loading: true });
    try {
      const [p, t] = await Promise.all([
        client.get("/projects"),
        client.get("/tasks"),
      ]);

      set({
        projects: p.data,
        tasks: t.data,
        loading: false,
      });
    } catch (err) {
      set({ loading: false });
    }
  },

  createProject: async (name, members) => {
    console.log(members, "cvmncxvmcxmvcx");
    if (!name) return;
    const memberIds = members.map((m) => m.value);
    await client.post("/projects/create", {
      name,
      members: memberIds,
    });
    set((state) => ({ ...state }));
    await useAdminStore.getState().fetchData();
  },

  deleteProject: async (id) => {
    await client.delete(`/projects/${id}`);
    await useAdminStore.getState().fetchData();
  },

  createTask: async (data) => {
    await client.post("/tasks/create", data);
    await useAdminStore.getState().fetchData();
  },

  deleteTask: async (id) => {
    await client.delete(`/tasks/${id}`);
    await useAdminStore.getState().fetchData();
  },
}));

import client from "./client";
export const loginApi = (data) => client.post("/auth/login", data);
export const registerApi = (data) => client.post("/auth/register", data);
export const fetchUserApi = (data) => client.get("/auth/me", data);
export const fetchUserListApi = (data) => client.get("/auth/users", data);
export const fetchProjectListApi = (data) => client.get("/projects/list", data);

import client from "./client";

export const getTasks = (projectId) => {
  return client.get(`/tasks/project/${projectId}`);
};

export const updateTaskStatus = (id, status) => {
  return client.patch(`/tasks/${id}/status`, { status });
};
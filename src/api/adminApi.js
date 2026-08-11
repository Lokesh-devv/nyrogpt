import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

const dataOf = (request) => request.then((response) => response.data);

// Admin request/query schemas are not included in the supplied documentation.
export const adminLogin = (data) => dataOf(apiClient.post(ENDPOINTS.admin.login, data));
export const adminLogout = () => dataOf(apiClient.post(ENDPOINTS.admin.logout));
export const getAdminMe = () => dataOf(apiClient.get(ENDPOINTS.admin.me));
export const getAdminOverview = (params) =>
  dataOf(apiClient.get(ENDPOINTS.admin.overview, { params }));
export const listAdminUsers = (params) =>
  dataOf(apiClient.get(ENDPOINTS.admin.users, { params }));
export const getAdminUser = (userId) =>
  dataOf(apiClient.get(ENDPOINTS.admin.user(userId)));
export const listAdminChats = (params) =>
  dataOf(apiClient.get(ENDPOINTS.admin.chats, { params }));
export const listAdminMessages = (params) =>
  dataOf(apiClient.get(ENDPOINTS.admin.messages, { params }));
export const getAdminChat = (chatId) =>
  dataOf(apiClient.get(ENDPOINTS.admin.chat(chatId)));
export const listAdminUploads = (params) =>
  dataOf(apiClient.get(ENDPOINTS.admin.uploads, { params }));
export const listAdminFeedback = (params) =>
  dataOf(apiClient.get(ENDPOINTS.admin.feedback, { params }));

export default {
  adminLogin,
  adminLogout,
  getAdminMe,
  getAdminOverview,
  listAdminUsers,
  getAdminUser,
  listAdminChats,
  listAdminMessages,
  getAdminChat,
  listAdminUploads,
  listAdminFeedback,
};

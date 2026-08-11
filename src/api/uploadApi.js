import { Platform } from "react-native";
import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

const dataOf = (request) => request.then((response) => response.data);

export const getGeneratedDocument = (filename) =>
  dataOf(apiClient.get(ENDPOINTS.files.generatedDocument(filename)));
export const headGeneratedDocument = (filename) =>
  dataOf(apiClient.head(ENDPOINTS.files.generatedDocument(filename)));
export const getGeneratedVideo = (filename) =>
  dataOf(apiClient.get(ENDPOINTS.files.generatedVideo(filename)));
export const headGeneratedVideo = (filename) =>
  dataOf(apiClient.head(ENDPOINTS.files.generatedVideo(filename)));
export const getStoredFile = (storageKey) =>
  dataOf(apiClient.get(ENDPOINTS.files.storedFile(storageKey)));
export const headStoredFile = (storageKey) =>
  dataOf(apiClient.head(ENDPOINTS.files.storedFile(storageKey)));

const prepareUploadFile = async (file) => {
  if (!file?.uri) {
    return file;
  }

  if (Platform.OS === "web") {
    const response = await fetch(file.uri);
    const blob = await response.blob();
    const fileName = file.name || "attachment";
    const mimeType = file.type || "application/octet-stream";

    if (typeof File !== "undefined") {
      return new File([blob], fileName, { type: mimeType });
    }

    return blob;
  }

  return file;
};

export const uploadFile = async ({ chatId, file }) => {
  const formData = new FormData();
  const uploadPayload = await prepareUploadFile(file);

  formData.append("chat_id", chatId);
  formData.append("file", uploadPayload, file.name);

  return dataOf(
    apiClient.post(ENDPOINTS.uploads, formData, {
      headers: { "Content-Type": undefined },
      // File extraction/transcoding can legitimately exceed the default API timeout.
      timeout: 120000,
    })
  );
};

export default {
  getGeneratedDocument,
  headGeneratedDocument,
  getGeneratedVideo,
  headGeneratedVideo,
  getStoredFile,
  headStoredFile,
  uploadFile,
};

import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

const dataOf = (request) => request.then((response) => response.data);

export const listChats = ({ includeArchived = false, archivedOnly = false } = {}) =>
  dataOf(
    apiClient.get(ENDPOINTS.chats.list, {
      params: { include_archived: includeArchived, archived_only: archivedOnly },
    })
  );

export const createChat = (title = "New chat") =>
  dataOf(apiClient.post(ENDPOINTS.chats.create, { title }));

export const getChat = (chatId) => dataOf(apiClient.get(ENDPOINTS.chats.detail(chatId)));

export const updateChat = (chatId, updates) =>
  dataOf(apiClient.patch(ENDPOINTS.chats.detail(chatId), updates));

export const deleteChat = (chatId) =>
  dataOf(apiClient.delete(ENDPOINTS.chats.detail(chatId)));

export const exportChatPdf = (chatId) =>
  dataOf(apiClient.get(ENDPOINTS.chats.exportPdf(chatId)));

export const respond = ({
  chatId,
  prompt,
  attachmentIds = [],
  enableWebSearch = false,
  language = "en",
  forceVideoGeneration = false,
  responseMode = "chat",
  signal,
}) =>
  dataOf(
    apiClient.post(
      ENDPOINTS.chats.respond,
      {
        chat_id: chatId,
        prompt,
        attachment_ids: attachmentIds,
        enable_web_search: enableWebSearch,
        language,
        force_video_generation: forceVideoGeneration,
        response_mode: responseMode,
      },
      {
        signal,
        // Attachment grounding may include text extraction or media analysis.
        timeout: attachmentIds.length > 0 ? 120000 : undefined,
      }
    )
  );

export const respondStream = ({
  chatId,
  prompt,
  attachmentIds = [],
  enableWebSearch = false,
  language = "en",
  forceVideoGeneration = false,
  responseMode = "chat",
}) =>
  dataOf(
    apiClient.post(ENDPOINTS.chats.respondStream, {
      chat_id: chatId,
      prompt,
      attachment_ids: attachmentIds,
      enable_web_search: enableWebSearch,
      language,
      force_video_generation: forceVideoGeneration,
      response_mode: responseMode,
    })
  );

export default {
  listChats,
  createChat,
  getChat,
  updateChat,
  deleteChat,
  exportChatPdf,
  respond,
  respondStream,
};

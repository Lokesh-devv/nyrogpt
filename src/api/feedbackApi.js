import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

const dataOf = (request) => request.then((response) => response.data);

export const submitFeedback = ({
  category,
  message,
  name,
  email,
  subject,
  pageUrl,
}) =>
  dataOf(
    apiClient.post(ENDPOINTS.feedback, {
      category,
      message,
      name,
      email,
      subject,
      page_url: pageUrl,
    })
  );

export const setMessageFeedback = (messageId, feedbackType) =>
  dataOf(
    apiClient.post(ENDPOINTS.messages.feedback(messageId), {
      feedback_type: feedbackType,
    })
  );

export const translateMessage = (messageId, language = "en") =>
  dataOf(
    apiClient.post(ENDPOINTS.messages.translate(messageId), {
      language,
    })
  );

export default { submitFeedback, setMessageFeedback, translateMessage };

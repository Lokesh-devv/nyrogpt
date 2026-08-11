import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

const dataOf = (request) => request.then((response) => response.data);

export const synthesizeSpeech = ({ text, language = "en" }) =>
  dataOf(apiClient.post(ENDPOINTS.speech, { text, language }));

export const transcribeSpeech = async () => {
  throw new Error("TODO: Speech transcription endpoint is not documented.");
};

export default { transcribeSpeech, synthesizeSpeech };

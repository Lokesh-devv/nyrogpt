import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const healthCheck = () => apiClient.get(ENDPOINTS.health).then((response) => response.data);

export default { healthCheck };

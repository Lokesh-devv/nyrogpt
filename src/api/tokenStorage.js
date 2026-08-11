import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "@Nyrogpt/access_token";
const REFRESH_TOKEN_KEY = "@Nyrogpt/refresh_token";

const tokenStorage = {
  getAccessToken: () => AsyncStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => AsyncStorage.getItem(REFRESH_TOKEN_KEY),

  async setTokens({ accessToken, refreshToken } = {}) {
    const operations = [];

    if (accessToken) {
      operations.push(AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken));
    }
    if (refreshToken) {
      operations.push(AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken));
    }

    await Promise.all(operations);
  },

  async clearTokens() {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  },
};

export default tokenStorage;

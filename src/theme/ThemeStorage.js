import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_THEME, THEME_NAMES } from "./themes";

const STORAGE_KEY = "@Nyrogpt/theme";

export const ThemeStorage = {
  async getTheme() {
    const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);
    return THEME_NAMES.includes(savedTheme) ? savedTheme : DEFAULT_THEME;
  },

  async setTheme(themeName) {
    await AsyncStorage.setItem(STORAGE_KEY, themeName);
  },
};

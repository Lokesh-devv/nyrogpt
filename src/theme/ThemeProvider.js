import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StatusBar } from "react-native";
import { ThemeContext } from "./ThemeContext";
import { ThemeStorage } from "./ThemeStorage";
import { DEFAULT_THEME, resolvedThemes, THEME_NAMES } from "./themes";

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(DEFAULT_THEME);

  useEffect(() => {
    let mounted = true;

    ThemeStorage.getTheme()
      .then((savedTheme) => {
        if (mounted) setThemeName(savedTheme);
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const setTheme = useCallback((nextTheme) => {
    if (!THEME_NAMES.includes(nextTheme)) return;
    setThemeName(nextTheme);
    ThemeStorage.setTheme(nextTheme).catch(() => {});
  }, []);

  const theme = resolvedThemes[themeName];
  const value = useMemo(
    () => ({ theme: themeName, colors: theme, setTheme, themes: resolvedThemes }),
    [setTheme, theme, themeName]
  );

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar
        barStyle={theme.isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
      {children}
    </ThemeContext.Provider>
  );
}

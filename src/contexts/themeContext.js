import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";

import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DefaultTheme as NavDefaultTheme,
  DarkTheme as NavDarkTheme,
} from "@react-navigation/native";

const ThemeContext = createContext();

const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationLight: NavDefaultTheme,
  reactNavigationDark: NavDarkTheme,
});

export const combinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
  fonts: MD3DarkTheme.fonts,
};
export const combinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
  fonts: MD3LightTheme.fonts,
};

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const theme = darkMode ? combinedDarkTheme : combinedLightTheme;

  const contextValue = useMemo(
    () => ({ darkMode, toggleTheme, theme }),
    [darkMode, toggleTheme, theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);

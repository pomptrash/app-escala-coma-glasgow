import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

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

const THEME_STORAGE_KEY = "@glasgow_app_theme";

const customPalettes = {
  light: {
    background: "#F0F4F8", // Azul gelo (fresco e limpo)
    card: "#FFFFFF", // Branco puro para os prontuários
    textPrimary: "#102A43", // Azul marinho profundo (melhor contraste que preto)
    textSecondary: "#486581", // Azul acinzentado para dados secundários
    button: "#2CB1BC", // Turquesa "Medical" (vivo, mas pastel)
    border: "#D9E2EC", // Divisórias sutis
  },
  dark: {
    background: "#0B1D2F", // Azul marinho "Night" (mais moderno que preto puro)
    card: "#1A2B3C", // Azul petróleo fechado para os cards
    textPrimary: "#F0F4F8", // Off-white azulado (confortável para os olhos)
    textSecondary: "#9FB3C8", // Azul pastel pálido
    button: "#38D1DE", // Ciano brilhante para botões no escuro
    border: "#243B53", // Bordas que definem a elevação
  },
  statusColors: {
    success: "#4CAF50",
    warning: "#FFC107",
    alert: "#FF9800",
    danger: "#D32F2F",
  },
};

export const combinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    ...customPalettes.dark,
    ...customPalettes.statusColors,
    background: customPalettes.dark.background,
    primary: customPalettes.dark.button,
    surface: customPalettes.dark.card,
    onBackground: customPalettes.dark.textPrimary,
    onSurfaceVariant: customPalettes.dark.textSecondary,
  },
  fonts: MD3DarkTheme.fonts,
};
export const combinedLightTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    ...customPalettes.light,
    ...customPalettes.statusColors,
    background: customPalettes.light.background,
    primary: customPalettes.light.button,
    surface: customPalettes.light.card,
    onBackground: customPalettes.light.textPrimary,
    onSurfaceVariant: customPalettes.light.textSecondary,
  },
  fonts: MD3LightTheme.fonts,
};

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const loadStorageTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setDarkMode(JSON.parse(savedTheme));
        }
      } catch (e) {
        console.error("Erro ao carregar o tema", e);
      }
    };

    loadStorageTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    try {
      const newTheme = !darkMode;
      setDarkMode(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
    } catch (e) {
      console.error("Erro ao salvar o tema", e);
    }
  }, [darkMode]);

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

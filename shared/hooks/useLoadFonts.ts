import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function useLoadFonts() {
  const [loaded] = useFonts({
    "tt-commons-bold": require("../../assets/fonts/TT-Commons-Bold.otf"),
    "tt-commons-medium": require("../../assets/fonts/TT-Commons-Medium.otf"),
    "tt-commons-regular": require("../../assets/fonts/TT-Commons-Regular.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return { loaded };
}

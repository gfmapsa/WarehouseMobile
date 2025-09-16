import useLoadFonts from "@/shared/hooks/useLoadFonts";
import TanstackProvider from "@/warehouse/context/TanstackProvider";
import WarehouseProvider from "@/warehouse/context/WarehouseProvider";
import { Stack } from "expo-router";
import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

function RootProvider({ children }: PropsWithChildren) {
  const { loaded } = useLoadFonts();

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <TanstackProvider>
          <WarehouseProvider>{children}</WarehouseProvider>
        </TanstackProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <RootProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          gestureDirection: "vertical",
        }}
      >
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="scanner" />
      </Stack>
    </RootProvider>
  );
}

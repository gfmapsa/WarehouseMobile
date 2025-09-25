import SharedProvider from "@/shared/context/SharedProvider";
import useLoadFonts from "@/shared/hooks/useLoadFonts";
import ScannerHeader from "@/warehouse/components/scanner/ScannerHeader";
import TanstackProvider from "@/warehouse/context/TanstackProvider";
import WarehouseProvider from "@/warehouse/context/WarehouseProvider";
import { Stack } from "expo-router";
import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

function RootProvider({ children }: PropsWithChildren) {
  const { loaded } = useLoadFonts();

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <TanstackProvider>
          <SharedProvider>
            <WarehouseProvider>{children}</WarehouseProvider>
          </SharedProvider>
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
          gestureEnabled: false,
          gestureDirection: "vertical",
        }}
      >
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen
          name="scanner"
          options={{ header: () => <ScannerHeader />, headerTransparent: true }}
        />
      </Stack>
    </RootProvider>
  );
}

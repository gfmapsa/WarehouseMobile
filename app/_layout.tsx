import AppHeader from "@/shared/components/header/AppHeader";
import useLoadFonts from "@/shared/hooks/useLoadFonts";
import TanstackProvider from "@/warehouse/context/TanstackProvider";
import WarehouseProvider from "@/warehouse/context/WarehouseProvider";
import { Drawer } from "expo-router/drawer";
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
      <Drawer screenOptions={{ header: (props) => <AppHeader {...props} /> }}>
        <Drawer.Screen name="index" options={{ title: "Deposito" }} />
        <Drawer.Screen name="other" />
      </Drawer>
    </RootProvider>
  );
}

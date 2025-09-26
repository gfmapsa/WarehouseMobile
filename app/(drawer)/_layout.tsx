import AppHeader from "@/shared/components/header/AppHeader";
import DrawerContent from "@/shared/components/navigation/DrawerContent";
import Drawer from "expo-router/drawer";
import React from "react";

export default function _layout() {
  return (
    <Drawer
      screenOptions={{ header: (props) => <AppHeader {...props} /> }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: "Deposito" }} />
      <Drawer.Screen name="container" options={{ title: "Contenedor" }} />
      <Drawer.Screen
        name="add-model"
        options={{ title: "Registrar maqueta" }}
      />
      <Drawer.Screen
        name="add-product"
        options={{ title: "Registrar producto" }}
      />
      <Drawer.Screen name="report" options={{ title: "Reportar/Sugerir" }} />
    </Drawer>
  );
}

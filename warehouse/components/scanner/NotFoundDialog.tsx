import AppButton from "@/shared/components/input/AppButton";
import AppText from "@/shared/components/text/AppText";
import { router } from "expo-router";
import React from "react";
import { Dialog, Portal } from "react-native-paper";

type Props = {
  open?: boolean;
  code?: string;
  onClose?: () => void;
};

export default function NotFoundDialog({ open = false, code, onClose }: Props) {
  function handleConfirm() {
    router.push({ pathname: "/add-model", params: { code } });
    onClose && onClose();
  }

  return (
    <Portal>
      <Dialog visible={open} onDismiss={onClose}>
        <Dialog.Title>MDA no encontrado</Dialog.Title>
        <Dialog.Content>
          <AppText>
            El codigo escaneado no se encuetra registado. ¿Desea registralo
            ahora?
          </AppText>
        </Dialog.Content>
        <Dialog.Actions>
          <AppButton onPress={onClose}>Cancelar</AppButton>
          <AppButton onPress={handleConfirm}>Confirmar</AppButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

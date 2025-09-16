import AppError from "@/shared/components/feedback/AppError";
import useModelScan from "@/warehouse/hooks/useModelScan";
import { WarehouseModelActions } from "@/warehouse/hooks/useQrScanner";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner,
} from "react-native-vision-camera";
import CameraBox from "./CameraBox";

type Props = {
  action: WarehouseModelActions;
};

export default function ScannerLayout({ action }: Props) {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const navigation = useNavigation();

  const { scan, scanning, ...props } = useModelScan(action);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: scan,
  });

  useEffect(() => {
    const checkPermission = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          navigation.goBack();
          return;
        }
      }
    };
    checkPermission();
  }, [hasPermission, requestPermission, navigation]);

  if (!hasPermission) {
    return null;
  }

  if (device == null) {
    return (
      <AppError>
        Ocurrio un problema con la camara. Por favor, intente de nuevo más tarde
      </AppError>
    );
  }

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        codeScanner={codeScanner}
      />
      <CameraBox {...props} scanning={scanning} />
    </>
  );
}

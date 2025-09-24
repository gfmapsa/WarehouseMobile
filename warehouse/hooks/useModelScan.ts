import { BACKEND_ERROR_MESSAGE } from "@/shared/constants/backend";
import { getErrorMessage } from "@/shared/utils/functions";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Code, CodeScannerFrame } from "react-native-vision-camera";
import { ModelScan } from "../dtos/warehouse";
import useReloadWarehose from "../store/useReloadWarehouse";
import useScanSnack from "../store/useScanSnack";
import useModelsRepository from "./useModelsRepository";
import { WarehouseModelActions } from "./useQrScanner";
import useScanRegisterModel from "./useScanRegisterModel";
import useScanRemoveModel from "./useScanRemoveModel";
import useScanSubgroups from "./useScanSubgroups";

export default function useModelScan(action: WarehouseModelActions) {
  const [scannedMda, setScannedMda] = useState<ModelScan | undefined>();
  const [scanning, setScanning] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [mdasSet, setMdasSet] = useState<Set<string>>(new Set());
  const [badScanMessage, setBadScanMessage] = useState("");

  useEffect(() => {
    if (badScanMessage) {
      setTimeout(() => setBadScanMessage(""), 1700);
    }
  }, [badScanMessage]);

  const { modelsRepository } = useModelsRepository();

  const [notFoundMda, setNotFoundMda] = useState(false);
  const [notFounded, setNotFounded] = useState("");

  const {
    handleSubgroups,
    scannedSubgroups,
    setScannedSubgroups,
    subgroups,
    setSubgroups,
    trigger,
    setTrigger,
  } = useScanSubgroups(setBadScanMessage, scannedMda?.mda);

  function resetAll() {
    setScannedMda(undefined);
    setMdasSet(new Set());
    setTrigger(false);
    setScannedSubgroups(new Set());
    setSubgroups(new Set());
    setBadScanMessage("");
    setNotFoundMda(false);
    setNotFounded("");
  }

  function resetNotFoundMda() {
    setNotFoundMda(false);
    setNotFounded("");
  }

  async function handleScan(codes: Code[], _: CodeScannerFrame) {
    if (!codes || codes.length === 0 || !codes[0].value) return;

    const scannedText = codes[0].value;

    if (!scannedText.startsWith("mda".toUpperCase())) {
      setBadScanMessage("No se escaneo un codigo MDA");
      return;
    }

    try {
      const foundMda = scannedText.split("-")[0];

      if (scannedMda && foundMda !== scannedMda.mda) {
        setBadScanMessage("Por favor, escanee los modulos de la misma maqueta");
        return;
      }

      const model = await modelsRepository.getModel(foundMda);

      if (isRegister && model.cell != null) {
        setBadScanMessage("Esa maqueta ya se encuentra registrada");
        return;
      }

      mdasSet.add(scannedText);

      setScannedMda(model);

      if (mdasSet.size < model.modules) {
        return;
      }

      setMdasSet(new Set());
    } catch {
      setNotFoundMda(true);
      setNotFounded(scannedText);
    }
  }

  const isRegister = action === "register";
  const allModulesScanned = mdasSet.size === 0 && scannedMda;
  const hasToRegister =
    allModulesScanned && scannedSubgroups.size === subgroups.size;
  const registerScanned = isRegister && hasToRegister ? true : false;

  const { reload } = useReloadWarehose();

  async function handleRefresh() {
    setScanning(false);
    setScannedMda(undefined);
    setTrigger(false);
    router.push("/(drawer)");
    reload && reload();
  }

  const { handleRegister, isRegistering } = useScanRegisterModel(
    handleRefresh,
    scannedMda?.mda
  );

  const { isRemoving } = useScanRemoveModel(
    handleRefresh,
    scannedMda?.mda,
    isRegister,
    trigger
  );

  const isLoading = isRegistering || isRemoving;

  const { setResult, onVisible } = useScanSnack();

  async function scan(codes: Code[], frame: CodeScannerFrame) {
    if (!codes || codes.length === 0 || !codes[0].value) return;

    if (cooldown || isLoading) return;

    const handler = registerScanned
      ? handleRegister
      : allModulesScanned
      ? handleSubgroups
      : handleScan;

    setScanning(true);
    setTimeout(() => setScanning(false), 1000);

    try {
      await handler(codes, frame);

      setCooldown(true);
      setTimeout(() => {
        setCooldown(false);
      }, 5000);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setResult(errorMessage ?? BACKEND_ERROR_MESSAGE, "error");
      setTimeout(() => onVisible(), 300);
    }
  }

  return {
    scannedMda,
    scan,
    registerScanned,
    isRegister,
    scanning,
    isLoading,
    badScanMessage,
    notFoundMda,
    resetNotFoundMda,
    notFounded,
    scannedModules: mdasSet.size,
    reset: resetAll,
    scannedSubgroups,
    subgroups,
  };
}

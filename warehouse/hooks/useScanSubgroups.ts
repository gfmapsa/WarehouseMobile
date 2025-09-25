/* eslint-disable react-hooks/exhaustive-deps */
import { BACKEND_ERROR_MESSAGE } from "@/shared/constants/backend";
import { useEffect, useState } from "react";
import { Code, CodeScannerFrame } from "react-native-vision-camera";
import useModelsRepository from "./useModelsRepository";

export default function useScanSubgroups(
  setBadScanMessage: React.Dispatch<React.SetStateAction<string>>,
  mda?: string,
  allModulesScanned?: boolean
) {
  const [receivedMda, setReceivedMda] = useState(mda);
  const [scannedSubgroups, setScannedSubgroups] = useState<Set<string>>(
    new Set()
  );
  const [subgroups, setSubgroups] = useState<Set<string>>(new Set());
  const [trigger, setTrigger] = useState(false);

  const { modelsRepository } = useModelsRepository();

  async function getSubgroups() {
    if (!mda) return;

    try {
      const subs = await modelsRepository.getSubgroups(mda);
      const subset = new Set(subs);
      setSubgroups(subset);
    } catch {
      setSubgroups(new Set());
    }
  }

  useEffect(() => {
    if (!receivedMda || receivedMda !== mda) {
      setReceivedMda(mda);
      return;
    }
  }, [mda]);

  useEffect(() => {
    if (receivedMda) getSubgroups();
  }, [receivedMda]);

  useEffect(() => {
    if (allModulesScanned && subgroups.size === 0) {
      setTrigger(true);
    }
  }, [allModulesScanned]);

  async function handleSubgroups(codes: Code[], _: CodeScannerFrame) {
    if (!mda || !subgroups) throw new Error(BACKEND_ERROR_MESSAGE);

    if (!codes || codes.length < 1) return;

    const scannedMda = codes[0].value;

    if (!scannedMda) return;

    if (!subgroups.has(scannedMda)) {
      setBadScanMessage(
        "Escanee un subgrupo de la maqueta principal por favor"
      );
      return;
    }

    scannedSubgroups.add(scannedMda);

    if (scannedSubgroups.size < subgroups.size) return;

    setTrigger(true);
  }

  return {
    handleSubgroups,
    scannedSubgroups,
    setScannedSubgroups,
    subgroups,
    setSubgroups,
    trigger,
    setTrigger,
    setReceivedMda,
  };
}

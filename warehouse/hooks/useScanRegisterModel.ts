import { getErrorMessage } from "@/shared/utils/functions";
import { useMutation } from "@tanstack/react-query";
import { Code, CodeScannerFrame } from "react-native-vision-camera";
import { REGISTER_MDA_KEY } from "../constants/backend";
import useScanSnack from "../store/useScanSnack";
import useWarehouseRepository from "./useWarehouseRepository";

export default function useScanRegisterModel(
  handleRefresh: () => void,
  mda?: string
) {
  const { warehouseRepository } = useWarehouseRepository();
  const { setResult, onVisible } = useScanSnack();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [REGISTER_MDA_KEY, mda],
    mutationFn: async ({
      mda,
      ubication,
    }: {
      mda: string;
      ubication: string;
    }) => warehouseRepository.registerModel(mda, ubication),
  });

  async function handleRegister(codes: Code[], _: CodeScannerFrame) {
    if (!codes || codes.length === 0 || !codes[0].value || !mda) return;

    const ubication = codes[0].value;

    if (!ubication || isNaN(Number(ubication))) return;

    try {
      await mutateAsync({ mda, ubication });
      setResult("Maqueta registrada correctamente", "success");
      setTimeout(() => onVisible(), 300);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    } finally {
      handleRefresh();
    }
  }

  return { handleRegister, isRegistering: isPending };
}

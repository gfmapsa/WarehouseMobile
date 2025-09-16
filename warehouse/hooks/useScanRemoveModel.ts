// import useScanSnack from "@/store/useScanSnack";
import { getErrorMessage } from "@/shared/utils/functions";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { REMOVE_MDA_KEY } from "../constants/backend";
import useWarehouseRepository from "./useWarehouseRepository";

export default function useScanRemoveModel(
  handleRefresh: () => void,
  mda?: string,
  isRegister?: boolean,
  trigger?: boolean
) {
  const { warehouseRepository } = useWarehouseRepository();
  // const { setResult, onVisible } = useScanSnack();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [REMOVE_MDA_KEY, mda],
    mutationFn: async (mda: string) => warehouseRepository.removeModel(mda),
  });

  useEffect(() => {
    async function handleRemove() {
      if (!mda || isRegister || !trigger) return;

      try {
        await mutateAsync(mda);
        // setResult("Maqueta retirada correctamente", "success");
        // setTimeout(() => onVisible(), 300);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error(errorMessage);
      } finally {
        handleRefresh();
      }
    }

    handleRemove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, isRegister]);

  return { isRemoving: isPending };
}

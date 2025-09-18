import useModelsRepository from "@/warehouse/hooks/useModelsRepository";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getErrorMessage } from "../../shared/utils/functions";
import { ADD_MODELS_KEY, GET_MODELS_KEY } from "../constants/backend";

const schema = yup.object({
  mda: yup.string().required("Debe ingresar un codigo MDA"),
  partNumbers: yup
    .array()
    .of(yup.string())
    .min(1, "Debe ingresar al menos una pieza")
    .required(),
});

export type AddModelData = yup.InferType<typeof schema>;

export default function useAddModel(code?: string) {
  const { control, handleSubmit, reset, setValue } = useForm<AddModelData>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      mda: code ?? "",
      partNumbers: [],
    },
  });

  const { modelsRepository } = useModelsRepository();

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, data: allPartNumbers } = useQuery({
    queryKey: [GET_MODELS_KEY],
    queryFn: async () => modelsRepository.getPartNumbers(),
  });

  const partNumbers = allPartNumbers
    ? allPartNumbers
        .filter((part) =>
          part.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const {
    mutateAsync,
    isPending,
    isError: isErrorMutating,
  } = useMutation({
    mutationKey: [ADD_MODELS_KEY],
    mutationFn: async (data: AddModelData) => modelsRepository.addModel(data),
  });

  function onChangeMda(text: string) {
    setValue(
      "mda",
      text.startsWith("MDA") ? text : `MDA${text.replace(/^MDA/, "")}`
    );
  }

  const [message, setMessage] = useState("");

  async function onSubmit(data: AddModelData) {
    try {
      await mutateAsync(data);
      setMessage("Maqueta agregada correctamente!");
    } catch (error) {
      const message = getErrorMessage(error);
      setMessage(message);
    } finally {
      reset({ mda: "", partNumbers: [] });
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    partNumbers,
    isLoading,
    message,
    isErrorMutating,
    isPending,
    onChangeMda,
    setSearchQuery,
  };
}

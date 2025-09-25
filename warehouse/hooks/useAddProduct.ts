import { useSnackbar } from "@/shared/hooks/useSnackbar";
import { getErrorMessage } from "@/shared/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import * as yup from "yup";
import { ADD_PRODUCT_KEY } from "../constants/backend";
import useModelsRepository from "./useModelsRepository";

const schema = yup.object({
  code: yup.string().required("Debe ingresar un codigo de producto"),
});

export type AddProductData = yup.InferType<typeof schema>;

export default function useAddProduct() {
  const { control, handleSubmit, reset } = useForm<AddProductData>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      code: "",
    },
  });

  const { modelsRepository } = useModelsRepository();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: [ADD_PRODUCT_KEY],
    mutationFn: async (data: AddProductData) =>
      modelsRepository.addProduct(data.code),
  });

  const [message, setMessage] = useState("");

  const { onDismiss, onVisible, visible } = useSnackbar();

  async function onSubmit(data: AddProductData) {
    Keyboard.dismiss();
    try {
      await mutateAsync(data);
      setMessage("Producto agregado correctamente!");
    } catch (error) {
      const message = getErrorMessage(error);
      setMessage(message);
    } finally {
      reset();
      onVisible();
    }
  }

  return {
    onSubmit,
    handleSubmit,
    message,
    visible,
    onDismiss,
    isError,
    isPending,
    control,
  };
}

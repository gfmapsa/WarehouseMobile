import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import * as yup from "yup";
import { REPORT_KEY } from "../constants/backend";
import { getErrorMessage } from "../utils/functions";
import useReportsRepository from "./useReportsRepository";
import { useSnackbar } from "./useSnackbar";

const schema = yup.object({
  subject: yup.string().required("Debe ingresar un asunto"),
  description: yup.string().required("Debe ingresar una descripción"),
});

export type ContactData = yup.InferType<typeof schema>;

export default function useContact() {
  const { control, handleSubmit, reset } = useForm<ContactData>({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  const { reportsRepository } = useReportsRepository();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [REPORT_KEY],
    mutationFn: async (data: ContactData) => reportsRepository.report(data),
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { onDismiss, onVisible, visible } = useSnackbar();

  async function onSubmit(data: ContactData) {
    Keyboard.dismiss();
    try {
      await mutateAsync(data);
      setIsError(false);
      setMessage("Reporte enviado!");
    } catch (error) {
      const message = getErrorMessage(error);
      setIsError(true);
      setMessage(message);
    } finally {
      reset();
      onVisible();
    }
  }

  return {
    control,
    handleSubmit,
    onSubmit,
    message,
    isError,
    isPending,
    onDismiss,
    visible,
  };
}

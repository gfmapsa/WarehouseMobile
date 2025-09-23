import useContact from "@/shared/hooks/useContact";
import React from "react";
import FormText from "../input/FormText";
import Textarea from "../input/Textarea";
import Form from "../layout/Form";

export default function ReportsLayout() {
  const {
    control,
    handleSubmit,
    onDismiss,
    message,
    onSubmit,
    visible,
    isPending,
    isError,
  } = useContact();

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      isError={isError}
      snackVisible={visible}
      onDismissSnack={onDismiss}
      snackMessage={message}
      isPending={isPending}
    >
      <FormText control={control} name="subject" label="Asunto" />
      <Textarea control={control} name="description" label="Descripción" />
    </Form>
  );
}

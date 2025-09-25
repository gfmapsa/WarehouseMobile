import FormText from "@/shared/components/input/FormText";
import Form from "@/shared/components/layout/Form";
import useAddProduct from "@/warehouse/hooks/useAddProduct";

export default function AddProductLayout() {
  const {
    control,
    handleSubmit,
    onSubmit,
    isPending,
    message,
    onDismiss,
    visible,
    isError,
  } = useAddProduct();

  return (
    <Form
      onDismissSnack={onDismiss}
      snackVisible={visible}
      snackMessage={message}
      isError={isError}
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormText control={control} name="code" label="Codigo de producto" />
    </Form>
  );
}

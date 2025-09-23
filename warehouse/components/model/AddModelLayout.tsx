import AppAutocomplete from "@/shared/components/input/AppAutocomplete";
import FormText from "@/shared/components/input/FormText";
import Form from "@/shared/components/layout/Form";
import AppText from "@/shared/components/text/AppText";
import useAddModel, { AddModelData } from "@/warehouse/hooks/useAddModel";
import React from "react";
import {
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default function AddModelLayout() {
  const {
    control,
    handleSubmit,
    onSubmit,
    isPending,
    message,
    partNumbers,
    isErrorMutating,
    isLoading,
    onChangeMda,
    setSearchQuery,
    onDismiss,
    visible,
  } = useAddModel();

  return (
    <Form
      onDismissSnack={onDismiss}
      snackVisible={visible}
      snackMessage={message}
      isError={isErrorMutating}
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormText
        control={control}
        name="mda"
        label="MDA"
        onChangeText={onChangeMda}
      />
      <AppAutocomplete<AddModelData, string>
        control={control}
        name="partNumbers"
        label="Pieza"
        data={partNumbers ?? []}
        isLoading={isLoading}
        multiple
        onSearch={setSearchQuery}
        getLabel={function (item: string): string {
          return item;
        }}
        renderOption={function (item: string): React.ReactNode {
          return <AppText style={{ margin: hp("1%") }}>{item}</AppText>;
        }}
      />
    </Form>
  );
}

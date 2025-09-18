import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { HelperText, TextInputProps } from "react-native-paper";
import AppInput from "./AppInput";

export type FormTextProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
} & Omit<TextInputProps, "value">;

export default function FormText<T extends FieldValues>({
  name,
  control,
  ...props
}: FormTextProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <AppInput
          value={field.value}
          setValue={field.onChange}
          {...props}
          onChangeText={(text) => {
            field.onChange(text);
            props.onChangeText?.(text);
          }}
          onBlur={field.onBlur}
          error={!!fieldState.error}
        >
          {fieldState.error && (
            <HelperText type="error" visible={!!fieldState.error}>
              {fieldState.error.message}
            </HelperText>
          )}
        </AppInput>
      )}
    />
  );
}

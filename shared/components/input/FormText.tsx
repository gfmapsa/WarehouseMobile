import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { HelperText } from "react-native-paper";
import AppInput, { AppInputProps } from "./AppInput";

export type FormTextProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & Omit<AppInputProps, "value" | "setValue">;

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
          {...props}
          value={field.value}
          setValue={field.onChange}
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

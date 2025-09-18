import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { HelperText } from "react-native-paper";
import { AppInputProps } from "./AppInput";
import Autocomplete, { AutocompleteProps } from "./Autocomplete";

export type FormTextProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & Omit<AppInputProps, "value" | "setValue">;

export type AppAutocompleteProps<T extends FieldValues, O> = FormTextProps<T> &
  Omit<AutocompleteProps<O>, "value" | "setValue">;

export default function AppAutocomplete<T extends FieldValues, O>({
  name,
  control,
  getLabel,
  ...props
}: AppAutocompleteProps<T, O>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Autocomplete<O>
            {...props}
            getLabel={getLabel}
            value={field.value}
            setValue={(val) => field.onChange(val)}
            onSelect={(item) => {
              if (props.multiple) {
                field.onChange(item);
              } else {
                field.onChange(getLabel(item as O));
              }
            }}
          />
          {fieldState.error && (
            <HelperText type="error" visible>
              {fieldState.error.message}
            </HelperText>
          )}
        </>
      )}
    />
  );
}

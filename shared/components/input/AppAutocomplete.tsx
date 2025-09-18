import { Controller, FieldValues } from "react-hook-form";
import { HelperText } from "react-native-paper";
import Autocomplete, { AutocompleteProps } from "./Autocomplete";
import { FormTextProps } from "./FormText";

export type AppAutocompleteProps<T extends FieldValues, O> = FormTextProps<T> &
  AutocompleteProps<O>;

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
            value={Array.isArray(field.value) ? "" : field.value || ""}
            setValue={(val) => field.onChange(val)}
            onSelect={(item) => field.onChange(getLabel(item))}
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

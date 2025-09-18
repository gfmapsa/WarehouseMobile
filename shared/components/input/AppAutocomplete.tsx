import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { HelperText } from "react-native-paper";
import Autocomplete from "./Autocomplete";

type AppAutocompleteProps<T extends FieldValues, O> = {
  name: Path<T>;
  control: Control<T>;
  data: O[];
  label: string;
  loading?: boolean;
  getLabel: (item: O) => string;
  renderOption: (item: O) => React.ReactNode;
  onSearch: (query: string) => void;
};

export default function AppAutocomplete<T extends FieldValues, O>({
  name,
  control,
  data,
  label,
  loading,
  getLabel,
  renderOption,
  onSearch,
}: AppAutocompleteProps<T, O>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Autocomplete<O>
            label={label}
            data={data}
            value={field.value || ""}
            setValue={(val) => field.onChange(val)}
            onSearch={onSearch}
            onSelect={(item) => field.onChange(getLabel(item))}
            loading={loading}
            getLabel={getLabel}
            renderOption={renderOption}
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

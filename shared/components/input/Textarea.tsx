import { FieldValues } from "react-hook-form";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FormTextProps } from "./AppAutocomplete";
import FormText from "./FormText";

export default function Textarea<T extends FieldValues>({
  style,
  ...props
}: FormTextProps<T>) {
  return (
    <FormText
      {...props}
      numberOfLines={4}
      verticalAlign="top"
      multiline
      style={[{ minHeight: hp("15%") }, style]}
    />
  );
}

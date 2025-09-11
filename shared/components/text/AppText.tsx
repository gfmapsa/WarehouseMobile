import { Colors } from "@/shared/constants/colors";
import { Text, TextProps } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type TTCommonsMapping = "regular" | "medium" | "bold";

type Props = {
  mode?: TTCommonsMapping;
} & TextProps;

const AppText = ({ mode = "regular", style, ...props }: Props) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: `tt-commons-${mode}`,
          fontSize: hp("2%"),
          color: Colors.primary,
        },
        style,
      ]}
    />
  );
};

export default AppText;

import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

import AppText from "@/shared/components/text/AppText";
import useTooltip from "@/shared/hooks/useTooltip";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

type Props = {
  products: string[];
};
export default function WarehouseModelProducts({ products }: Props) {
  const { open, handleClose, toggleOpen } = useTooltip();

  return (
    <Tooltip
      isVisible={open}
      onClose={handleClose}
      content={
        <View style={styles.container}>
          {products.map((product, index) => (
            <AppText key={product} style={styles.text}>
              {product} {index < products.length - 1 && "-"}{" "}
            </AppText>
          ))}
        </View>
      }
      arrowStyle={{ display: "none" }}
    >
      <TouchableOpacity onPress={toggleOpen}>
        <Ionicons name="information-circle-outline" size={hp("2.5%")} />
      </TouchableOpacity>
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 1,
  },

  text: {
    fontSize: hp("2%"),
  },
});

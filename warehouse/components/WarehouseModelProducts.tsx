import AppText from "@/shared/components/text/AppText";
import useTooltip from "@/shared/hooks/useTooltip";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Tooltip from "react-native-walkthrough-tooltip";

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
        <AntDesign name="info-circle" size={hp("2%")} />
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

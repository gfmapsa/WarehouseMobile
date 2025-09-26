import { Skeleton } from "@/shared/components/feedback/Skeleton";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { WAREHOUSE_CELL_SIZE } from "../WarehouseItem";
import {
    STANDS_CELL,
    STANDS_COLUMNS,
    STANDS_GAP,
    STANDS_ROWS,
} from "./ContainerStands";

const INPUT_HEIGHT = 50;

export default function ContainerSkeleton() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 200, gap: 40 }}
    >
      <View style={styles.inputContainer}>
        <Skeleton height={INPUT_HEIGHT} width={"100%"} />
        <Skeleton height={INPUT_HEIGHT} width={"100%"} />
      </View>
      <View style={styles.stands}>
        {Array.from({ length: 27 }).map((_, index) => (
          <Skeleton
            key={index}
            height={WAREHOUSE_CELL_SIZE}
            width={WAREHOUSE_CELL_SIZE}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 20,
  },

  stands: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: STANDS_GAP,
    width: STANDS_CELL * STANDS_COLUMNS,
    height: STANDS_CELL * STANDS_ROWS,
  },
});

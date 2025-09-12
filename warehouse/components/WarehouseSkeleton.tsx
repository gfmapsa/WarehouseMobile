import { Skeleton } from "@/shared/components/feedback/Skeleton";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { WAREHOUSE_CELL_SIZE } from "./WarehouseItem";
import { LATERAL_GAP } from "./WarehouseLateral";
import {
  STANDS_CELL,
  STANDS_COLUMNS,
  STANDS_GAP,
  STANDS_ROWS,
} from "./WarehouseStands";

const INPUT_HEIGHT = 50;

export default function WarehouseSkeleton() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 200, gap: 40 }}
    >
      <View style={styles.inputContainer}>
        <Skeleton height={INPUT_HEIGHT} width={"100%"} />
        <Skeleton height={INPUT_HEIGHT} width={"100%"} />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.horizontalContainer}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.lateral}>
          {Array.from({ length: 14 }).map((_, index) => (
            <Skeleton
              key={index}
              height={WAREHOUSE_CELL_SIZE}
              width={WAREHOUSE_CELL_SIZE}
            />
          ))}
        </View>
        <View style={styles.stands}>
          {Array.from({ length: 32 }).map((_, index) => (
            <Skeleton
              key={index}
              height={WAREHOUSE_CELL_SIZE}
              width={WAREHOUSE_CELL_SIZE}
            />
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    gap: 80,
  },

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

  lateral: {
    gap: LATERAL_GAP,
  },
});

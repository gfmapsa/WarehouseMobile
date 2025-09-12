import { Colors } from "@/shared/constants/colors";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { WarehouseCell } from "../models/WarehouseCell";
import WarehouseEmptyCell from "./WarehouseEmptyCell";
import WarehouseFilledCell from "./WarehouseFilledCell";

export const WAREHOUSE_CELL_SIZE = wp("25%");

type Props = {
  cell: WarehouseCell;
};

export type WarehouseItemHandle = {
  animateHighlight: () => void;
  measureLayout: (
    relativeTo: number,
    onSuccess: (x: number, y: number, width: number, height: number) => void,
    onFail: () => void
  ) => void;
};

const BG_COLOR = "white";
const SUCCESS_COLOR = Colors.success;
const TIMING = 300;
const DELAY = 500;

const WarehouseItem = forwardRef<WarehouseItemHandle, Props>(
  ({ cell }, ref) => {
    const viewRef = useRef<Animated.View | null>(null);

    const scale = useSharedValue(1);
    const bgColor = useSharedValue(BG_COLOR);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      backgroundColor: bgColor.value,
    }));

    const isEmpty = cell.models.length === 0;

    useImperativeHandle(ref, () => ({
      animateHighlight: () => {
        scale.value = withTiming(1.2, { duration: TIMING }, () => {
          scale.value = withDelay(DELAY, withTiming(1, { duration: TIMING }));
        });

        bgColor.value = withTiming(SUCCESS_COLOR, { duration: TIMING }, () => {
          bgColor.value = withDelay(
            DELAY,
            withTiming(BG_COLOR, { duration: TIMING })
          );
        });
      },
      measureLayout: (relativeTo, onSuccess, onFail) => {
        if (viewRef.current) {
          viewRef.current.measureLayout(relativeTo, onSuccess, onFail);
        } else {
          onFail?.();
        }
      },
    }));

    return (
      <Animated.View ref={viewRef} style={[styles.container, animatedStyle]}>
        {isEmpty ? (
          <WarehouseEmptyCell />
        ) : (
          <WarehouseFilledCell models={cell.models} />
        )}
      </Animated.View>
    );
  }
);

WarehouseItem.displayName = "WarehouseItem";

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    backgroundColor: BG_COLOR,
    borderRadius: 8,
    width: WAREHOUSE_CELL_SIZE,
    height: WAREHOUSE_CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WarehouseItem;
import { RefObject, useImperativeHandle, useRef } from "react";
import { ScrollView, View } from "react-native";

export type WarehouseMapHandle = {
  scrollTo: (x: number, y: number) => void;
  scrollToCell: (cellId: string) => void;
};

const OFFSET_X = 100;
const OFFSET_Y = 80;

export default function useMapRefs(
  ref: React.ForwardedRef<WarehouseMapHandle>,
  itemsRef: RefObject<Record<string, View | null>>
) {
  const verticalScrollRef = useRef<ScrollView | null>(null);
  const horizontalScrollRef = useRef<ScrollView | null>(null);

  useImperativeHandle(ref, () => ({
    scrollTo: (x: number, y: number) => {
      verticalScrollRef.current?.scrollTo({ y, animated: true });
      horizontalScrollRef.current?.scrollTo({
        x,
        animated: true,
      });
    },
    scrollToCell: (cellId: string) => {
      const itemRef = itemsRef.current?.[cellId];
      const scrollViewRef = horizontalScrollRef.current as unknown as View;

      if (itemRef && scrollViewRef) {
        itemRef.measureLayout(
          scrollViewRef,
          (x, y) => {
            const scrollX = Math.max(0, x - OFFSET_X);
            const scrollY = Math.max(0, y - OFFSET_Y);

            verticalScrollRef.current?.scrollTo({
              y: scrollY,
              animated: true,
            });
            horizontalScrollRef.current?.scrollTo({
              x: scrollX,
              animated: true,
            });
          },
          () => {
            console.log("Failed to measure layout");
          }
        );

        if ("animateHighlight" in itemRef) {
          itemRef.animateHighlight();
        }
      } else {
        console.log("Item ref or scroll view ref is missing.");
      }
    },
  }));

  return { verticalScrollRef, horizontalScrollRef };
}

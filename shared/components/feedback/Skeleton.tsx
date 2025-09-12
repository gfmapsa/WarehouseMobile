import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { DimensionValue, StyleSheet, ViewStyle } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

export enum ANIMATION_DIRECTION {
  leftToRight = "leftToRight",
  rightToLeft = "rightToLeft",
  topToBottom = "topToBottom",
  bottomToTop = "bottomToTop",
}

export enum ANIMATION_TYPE {
  shiver = "shiver",
  pulse = "pulse",
}

type Props = {
  height: DimensionValue;
  width: DimensionValue;
  style?: ViewStyle;
  backgroundColor?: string;
  direction?: ANIMATION_DIRECTION;
  type?: ANIMATION_TYPE;
};

export const Skeleton = ({
  height,
  width,
  style = {},
  backgroundColor = "#CCDDEE",
  direction = ANIMATION_DIRECTION.leftToRight,
  type = ANIMATION_TYPE.shiver,
}: Props) => {
  const isXDirectionAnimation =
    direction === ANIMATION_DIRECTION.leftToRight ||
    direction === ANIMATION_DIRECTION.rightToLeft;

  //to move the gradient view across x direction
  const translatex = useSharedValue(0);

  //track dimensions of parent view for deciding movable boundaries
  const [parentDimensions, setParentDimensions] = useState({
    height: -1,
    width: -1,
  });

  //to toggle between different direction of move
  const [coordinates, setCoordinates] = useState({
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  });

  //track dimensions of child (gradient view) for deciding movable boundaries
  const [gradientDimensions, setGradientDimensions] = useState({
    height: -1,
    width: -1,
  });

  const animatedStyleX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translatex.value,
        },
      ],
    };
  });

  useEffect(() => {
    return () => {
      //cancel running animations after component unmounts
      cancelAnimation(translatex);
    };
  }, []);

  useEffect(() => {
    if (!direction) return;
    switch (direction) {
      case ANIMATION_DIRECTION.leftToRight:
        setCoordinates({
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        });
        break;
      case ANIMATION_DIRECTION.rightToLeft:
        setCoordinates({
          start: { x: 1, y: 0 },
          end: { x: 0, y: 0 },
        });
        break;
      case ANIMATION_DIRECTION.topToBottom:
        setCoordinates({
          start: { x: 0, y: 0 },
          end: { x: 0, y: 1 },
        });
        break;
      case ANIMATION_DIRECTION.bottomToTop:
        setCoordinates({
          start: { x: 0, y: 1 },
          end: { x: 0, y: 0 },
        });
        break;
      default:
        break;
    }
  }, [direction]);

  const animateAcrossXDirection = () => {
    /*
    We need overflowOffset because we start moving animation little bit before actual start
    Also we end moving animation little bit after actual end.
    We hide those overflowed views using overflow: "hidden" on parent view
    */
    const overflowOffset = parentDimensions.width * 0.75;

    /*
    In case of leftToRight direction, we start animation from leftMostEnd
    In case of rightToLeft direction, we stop animation at leftMostEnd
    */
    const leftMostEnd = -overflowOffset;

    /*
    In case of leftToRight direction, we stop animation at rightMostEnd
    In case of rightToLeft direction, we start animation at rightMostEnd
    We subtract gradientDimensions.width because animation should end (in case of leftToRight)/start(in case of rightToLeft) 
     when leftmost end of gradient view touches the right most end of parent view
    */
    const rightMostEnd =
      parentDimensions.width - gradientDimensions.width + overflowOffset;
    translatex.value =
      direction === ANIMATION_DIRECTION.leftToRight
        ? leftMostEnd
        : rightMostEnd;
    translatex.value = withRepeat(
      withDelay(
        800, //Delay before the next iteration of animation starts
        withTiming(
          direction === ANIMATION_DIRECTION.leftToRight
            ? rightMostEnd
            : leftMostEnd,
          {
            duration: 500,
            easing: Easing.linear,
          }
        )
      ),
      -1
    );
  };

  useEffect(() => {
    if (
      parentDimensions.height !== -1 &&
      parentDimensions.width !== -1 &&
      gradientDimensions.height !== -1 &&
      gradientDimensions.width !== -1 &&
      direction
    ) {
      if (isXDirectionAnimation) {
        animateAcrossXDirection();
      }
    }
  }, [parentDimensions, gradientDimensions, direction, isXDirectionAnimation]);

  return (
    <Animated.View
      style={[{ height, width, backgroundColor }, style, styles.itemParent]}
      onLayout={(event) => {
        if (
          parentDimensions.height === -1 &&
          parentDimensions.width === -1 &&
          type === ANIMATION_TYPE.shiver
        ) {
          //only in case of shiver animation, find out the width and height of parent container.
          setParentDimensions({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          });
        }
      }}
    >
      {type === ANIMATION_TYPE.shiver ? (
        <Animated.View
          style={[
            isXDirectionAnimation && {
              height: "100%",
              width: "80%",
            },
            isXDirectionAnimation && animatedStyleX,
          ]}
          onLayout={(event) => {
            if (
              gradientDimensions.width === -1 &&
              gradientDimensions.height === -1
            ) {
              setGradientDimensions({
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
              });
            }
          }}
        >
          <LinearGradient
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.4)",
              "rgba(255,255,255,0.6)",
              "rgba(255,255,255,0.7)",
              "rgba(255,255,255,0.6)",
              "rgba(255,255,255,0.4)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0)",
            ]}
            style={styles.background}
            start={coordinates.start}
            end={coordinates.end}
          />
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemParent: {
    overflow: "hidden",
  },
  background: {
    height: "100%",
    width: "100%",
  },
});

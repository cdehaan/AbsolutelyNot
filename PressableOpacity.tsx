import React, { PropsWithChildren, ReactNode } from "react";
import { Pressable, Animated } from "react-native";

const animated = new Animated.Value(1);
const PressableOpacity = ({ children, ...props }: PropsWithChildren) => {
  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={fadeIn} onPressOut={fadeOut} {...props}>
      <Animated.View style={{ opacity: animated }}>{children}</Animated.View>
    </Pressable>
  );
};

export default PressableOpacity;
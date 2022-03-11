import React, { ReactNode } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HeaderNavigationProps = {
  title?: String;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
  style?: any;
  titleStyle?: any;
  titleEllipsis?: boolean;
};

const HeaderNavigation = ({
  title,
  leftButton,
  rightButton,
  style,
  titleStyle,
  titleEllipsis,
}: HeaderNavigationProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        style,
        Platform.OS === "android" && {
          marginTop: insets.top,
        },
      ]}
    >
      {leftButton && (
        <View style={styles.leftButtonContainer}>{leftButton}</View>
      )}

      {titleEllipsis ? (
        <Text
          style={[styles.title, titleStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      ) : (
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      )}

      {rightButton && (
        <View style={styles.rightButtonContainer}>{rightButton}</View>
      )}
    </View>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    minHeight: 24,
  },
  leftButtonContainer: {
    position: "absolute",
    left: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: -1,
  },
  rightButtonContainer: {
    position: "absolute",
    right: 16,
  },
});

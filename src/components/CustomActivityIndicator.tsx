import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

type CustomActivityIndicatorProps = {
  color?: string;
};

const CustomActivityIndicator = ({ color }: CustomActivityIndicatorProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.loaderBackground]}>
        <ActivityIndicator color={color} size="large" />
      </View>
    </View>
  );
};

CustomActivityIndicator.defaultProps = {
  color: "white",
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.3
  },
  loaderBackground: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

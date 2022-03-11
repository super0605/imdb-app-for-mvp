import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type HeaderBackButtonProps = {
  onPress: () => void;
};

const HeaderBackButton = ({ onPress }: HeaderBackButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons
        name="chevron-left"
        color={"#000000"}
        size={24}
      />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 48,
    justifyContent: "center",
  },
});

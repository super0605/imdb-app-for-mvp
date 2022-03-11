import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

const { width, height } = Dimensions.get("window");

const NetworkStatus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();

  const checkNetworkAvailability = () => {
    setLoading(true);
    if (netInfo.isConnected) {
      setTimeout(() => {
        setLoading(false);
        setIsVisible(false);
      }, 5000);
    } else {
      setTimeout(() => {
        setIsVisible(true);
        setLoading(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (netInfo.isConnected) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [netInfo.isConnected]);
  return (
    <Modal animationType="none" transparent={true} visible={isVisible}>
      <View style={styles.overlay} />
      <View style={styles.centered}>
        <View style={styles.content}>
          <Text style={styles.contentHeader} allowFontScaling={false}>
            Connection Error !
          </Text>
          <Text style={styles.contentText} allowFontScaling={false}>
            You appear to be offline
          </Text>
          {!loading ? (
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={checkNetworkAvailability}
            >
              <Text style={styles.textStyle}>Try again</Text>
            </Pressable>
          ) : (
            <View style={[styles.button, styles.buttonClose]}>
              <ActivityIndicator color="#fff" />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default NetworkStatus;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    width: "100%",
    backgroundColor: "#DF2020",
  },
  label: {
    textAlign: "center",
    fontSize: 12,
    color: "#F0F0F0",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "50%",
    top: "30%",
    right: 0,
    left: 0,
  },
  content: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#289B62",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  contentText: {
    marginBottom: 15,
    textAlign: "center",
  },
  contentHeader: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    width,
    height,
  },
});

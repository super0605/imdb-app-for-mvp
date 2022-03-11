import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { MovieType } from "../redux/types";
import { SELECTED_MOVIE_REQUEST } from "../redux/constants";

const screenWidth = Dimensions.get("window").width;

type Props = {
  item: MovieType;
};

export default function MovieItem(props: Props) {
  const { item } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressItem = () => {
    dispatch({ type: SELECTED_MOVIE_REQUEST, payload: { movie: item } });

    navigation.navigate("MovieDetails");
  };

  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={styles.listItem}>
        <View style={styles.imageView}>
          <FastImage
            source={{
              uri: `https://image.tmdb.org/t/p/w400${
                item.backdrop_path || item.poster_path
              }`,
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.textView}>
          <Text numberOfLines={1} style={styles.name}>
            {item.original_title || item.title || item.original_name}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {item.overview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    height: 96,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  imageView: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  textView: {
    width: screenWidth - 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  description: {
    fontSize: 14,
  },
});

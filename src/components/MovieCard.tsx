import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
import { MovieType } from "../redux/types";
import { SELECTED_MOVIE_REQUEST } from "../redux/constants";

const screenWidth = Dimensions.get("window").width;

const starIcon = require("../assets/images/star-icon.png");

type Props = {
  item: MovieType;
};

export default function MovieCard(props: Props) {
  const { item } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleReadMore = () => {
    dispatch({ type: SELECTED_MOVIE_REQUEST, payload: { movie: item } });

    navigation.navigate("MovieDetails");
  };

  return (
    <View style={styles.movieItem}>
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
      <View style={styles.detailContent}>
        <View style={styles.rateRow}>
          <View style={styles.rateView}>
            <FastImage style={styles.starIcon} source={starIcon} />
            <Text style={styles.starRate}>{item.vote_average}</Text>
          </View>
          <TouchableOpacity style={styles.readMore} onPress={handleReadMore}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
        <Text numberOfLines={1} style={styles.name}>
          {item.original_title || item.title || item.original_name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.overview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieItem: {
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 16,
  },
  imageView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  detailContent: {
    width: screenWidth * 0.9,
    padding: 10,
    backgroundColor: "#1f1f1f",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginVertical: 6,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
  },
  avatar: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.5,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  readMore: {
    paddingHorizontal: 4,
  },
  readMoreText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  rateView: {
    flexDirection: "row",
    alignItems: "center",
  },
  starRate: {
    fontSize: 16,
    color: "#ffffff",
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  
});

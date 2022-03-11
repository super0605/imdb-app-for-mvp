import React, { Fragment, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import HeaderNavigation from "../components/HeaderNavigation";
import HeaderBackButton from "../components/HeaderBackButton";
import {
  ADD_FAVORITE_REQUEST,
  REMOVE_FAVORITE_REQUEST,
} from "../redux/constants";
import { getMovieState, getFavoritesState } from "../redux/selectors";

const starIcon = require("../assets/images/star-icon.png");

export default function MovieDetails() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { selectedMovie, isFetching } = useSelector(getMovieState);
  const { favorites, isLoading } = useSelector(getFavoritesState);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (selectedMovie !== null) {
      const favoriteMovie = favorites.filter(
        (mv) => mv.id === selectedMovie.id
      );
      setIsFavorite(favoriteMovie.length > 0);
    }
  }, [favorites.length, selectedMovie]);

  const handleFavorite = () => {
    if (isFavorite && selectedMovie !== null) {
      dispatch({
        type: REMOVE_FAVORITE_REQUEST,
        payload: { movie: selectedMovie },
      });
    } else if (!isFavorite && selectedMovie !== null) {
      dispatch({
        type: ADD_FAVORITE_REQUEST,
        payload: { movie: selectedMovie },
      });
    }
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <HeaderNavigation
          title={"Movie Details"}
          titleStyle={styles.titleText}
          titleEllipsis
          leftButton={
            <HeaderBackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          }
        />
        {selectedMovie && selectedMovie !== null && (
          <View style={styles.detailsContainer}>
            <View style={styles.imageView}>
              <FastImage
                source={{
                  uri: `https://image.tmdb.org/t/p/w400${
                    selectedMovie.backdrop_path || selectedMovie.poster_path
                  }`,
                }}
                style={styles.coverPhoto}
              />
              <TouchableOpacity
                style={styles.favorite}
                onPress={handleFavorite}
              >
                <MaterialCommunityIcons
                  name={isFavorite ? "cards-heart" : "cards-heart-outline"}
                  color={"tomato"}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.detailsMovieNameRow}>
              <Text style={styles.detailsMovieName}>
                {selectedMovie.original_title ||
                  selectedMovie.title ||
                  selectedMovie.original_name}
              </Text>
            </View>
            <View style={styles.rateView}>
              <FastImage style={styles.starIcon} source={starIcon} />
              <Text style={styles.starRate}>{selectedMovie.vote_average}</Text>
            </View>
            <Text style={styles.description}>{selectedMovie.overview}</Text>
          </View>
        )}
        {(isFetching || isLoading) && <CustomActivityIndicator />}
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  titleText: {
    marginLeft: 50,
    marginRight: 60,
  },
  detailsContainer: {
    marginHorizontal: 16,
  },
  imageView: {
    position: "relative",
  },
  coverPhoto: {
    height: 195,
    resizeMode: "cover",
    borderRadius: 8,
    marginTop: 16,
  },
  detailsMovieNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  detailsMovieName: {
    color: "#262C2F",
    fontWeight: "bold",
    fontSize: 22,
  },
  rateView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  starRate: {
    fontSize: 16,
    color: "#262C2F",
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    color: "#262C2F",
    marginBottom: 10,
  },
  favorite: {
    position: "absolute",
    top: 25,
    right: 10,
  },
});

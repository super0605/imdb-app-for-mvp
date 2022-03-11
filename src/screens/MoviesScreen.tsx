import React, { useEffect, Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MovieCarousel from "../components/MovieCarousel";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { GET_MOVIES_REQUEST } from "../redux/constants";
import { getMovieState } from "../redux/selectors";

const screenWidth = Dimensions.get("window").width;

export default function MoviesScreen() {
  const dispatch = useDispatch();
  const {
    nowPlayingCollections,
    featuredTodayCollections,
    fanFavoritesCollections,
    isFetching,
  } = useSelector(getMovieState);

  useEffect(() => {
    dispatch({
      type: GET_MOVIES_REQUEST,
      payload: { url: "/movie/now_playing" },
    });
    dispatch({
      type: GET_MOVIES_REQUEST,
      payload: { url: "/trending/all/day" },
    });
    dispatch({
      type: GET_MOVIES_REQUEST,
      payload: { url: "/movie/popular" },
    });
  }, []);

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        {isFetching ? (
          <CustomActivityIndicator />
        ) : (
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Now Playing Movies</Text>
              {nowPlayingCollections.length > 0 && (
                <MovieCarousel movies={nowPlayingCollections} />
              )}
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Featured today</Text>
              {featuredTodayCollections.length > 0 && (
                <MovieCarousel movies={featuredTodayCollections} />
              )}
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Fan Favorites</Text>
              {fanFavoritesCollections.length > 0 && (
                <MovieCarousel movies={fanFavoritesCollections} />
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  banner: {
    flex: 0,
    backgroundColor: "#F1F1F1",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  sectionContainer: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
    paddingHorizontal: screenWidth * 0.05,
  },
});

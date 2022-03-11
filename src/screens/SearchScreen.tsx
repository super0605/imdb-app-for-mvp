import React, { useState, useEffect, Fragment, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "react-native-dynamic-search-bar";
import MovieItem from "../components/MovieItem";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { GET_ALL_MOVIES_REQUEST } from "../redux/constants";
import { getMovieState } from "../redux/selectors";

const screenWidth = Dimensions.get("window").width;

export default function SearchScreen() {
  const dispatch = useDispatch();
  const { movies, isFetching } = useSelector(getMovieState);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState("");
  const fetchMore = useCallback(() => setPage(page + 1), [page]);

  useEffect(() => {
    if (query.length > 2) {
      dispatch({ type: GET_ALL_MOVIES_REQUEST, payload: { query } });
    }
  }, [query]);

  const handleSearch = (text: string) => {
    setQuery(text);
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.banner} />
      <SafeAreaView style={styles.container}>
        <View style={styles.searchInput}>
          <SearchBar
            placeholder="Search Movies & TV Show"
            onChangeText={(queryText) => handleSearch(queryText)}
          />
        </View>

        <View style={styles.list}>
          {isFetching ? (
            <CustomActivityIndicator />
          ) : (
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieItem item={item} />}
              onEndReachedThreshold={0.9}
              onEndReached={fetchMore}
              initialNumToRender={10}
            />
          )}
        </View>
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
  list: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchInput: {
    backgroundColor: "#fff",
    paddingTop: 10,
    height: 60,
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

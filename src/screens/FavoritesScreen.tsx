import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import CustomActivityIndicator from "../components/CustomActivityIndicator";
import { getFavoritesState } from "../redux/selectors";

const screenWidth = Dimensions.get("window").width;

export default function FavoritesScreen() {
  const { favorites, isLoading } = useSelector(getFavoritesState);

  return (
    <Fragment>
      <SafeAreaView style={styles.banner} />
      <SafeAreaView style={styles.container}>
        <View style={styles.list}>
          {isLoading ? (
            <CustomActivityIndicator />
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.cardWrap}>
                  <MovieCard item={item} />
                </View>
              )}
              onEndReachedThreshold={0.9}
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
  cardWrap: {
    paddingTop: 20,
  },
});

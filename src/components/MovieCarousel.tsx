import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
import { MovieType } from "../redux/types";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

type Props = {
  movies: MovieType[];
};

export default function MovieCarousel(props: Props) {
  const { movies } = props;
  const isCarousel = React.useRef(null);

  const renderItem = ({ item, index }: { item: MovieType; index: number }) => {
    return (
      <View key={index}>
        <MovieCard item={item} />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={isCarousel}
        data={movies}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        layout="stack"
        layoutCardOffset={9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    height: "auto",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

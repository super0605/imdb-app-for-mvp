import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PersistGate } from "redux-persist/integration/react";

import NetworkStatus from "./src/components/NetworkStatus";
import CustomActivityIndicator from "./src/components/CustomActivityIndicator";
import MoviesScreen from "./src/screens/MoviesScreen";
import SearchScreen from "./src/screens/SearchScreen";
import MovieDetails from "./src/screens/MovieDetails";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import configureStore from "./src/redux/store";

const { store, persistor } = configureStore();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          tabBarLabel: "Movies",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="folder-search-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cards-heart"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNavigation}
            />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
          </Stack.Navigator>
          <NetworkStatus />
        </NavigationContainer>
        {/* <CustomActivityIndicator /> */}
        
      </PersistGate>
    </Provider>
  );
}

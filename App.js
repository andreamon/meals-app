import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Home from "./components/Home";
import Welcome from "./components/Welcome";
import List from "./components/ListOfMeals";

const Tab = createBottomTabNavigator();

export default function App() {
  const getFonts = () =>
    Font.loadAsync({
      montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
      "montserrat-semi-bold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
      "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    });

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Info App") {
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
              } else if (route.name === "List") {
                iconName = focused ? "ios-list-box" : "ios-list";
              } else if (route.name === "Home") {
                iconName = focused ? "ios-home" : "ios-home";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#1C9BE3",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen
            name="List"
            component={List}
            options={{ title: "Listado de comidas" }}
          />
          <Tab.Screen name="Info App" component={Welcome} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}

import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import {globalStyles} from '../styles/global';

const Welcome = ({navigation}) => {
  return (
    <View style={globalStyles.containerWelcome}>
      <Text style={globalStyles.textWelcome}>Organización semanal de comidas</Text>
      <Image source={require("../assets/images/food-main.jpg")} style={{borderRadius:10}} />
      <TouchableOpacity onPress={()=>navigation.navigate('List')}>
        <Text style={globalStyles.buttonWelcome}>A organizarse!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
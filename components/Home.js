import React, { useState, useEffect } from "react";
import { Text, TouchableHighlight, TouchableOpacity, View, FlatList} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../database/firebase";
import Detail from "./Detail";
import { globalStyles } from "../styles/global";

const Home = () => {
  const [showList, setShowList] = useState(null);
  const [meals, setMeals] = useState([]);
  const [mealSelected, setMealSelected] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const typesOfMeal = ["Desayuno", "Almuerzo", "Snack", "Merienda", "Cena"];

  const handleShowModal = (meal) => {
    setMealSelected(meal);
    setModalVisible(true);
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  
  useEffect(() => {
    firebase.db.collection("meals").onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.docs.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setMeals(list);
    });
  }, []);

  const Item = ({ name }) => (
    <View style={globalStyles.item}>
      <Text style={globalStyles.itemText}>{name}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleShowModal(item)}>
      <Item name={item.name} />
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.containerHome}>
      {typesOfMeal.map((value) => {
        return (
          <TouchableHighlight style={{ flexGrow: 0.1 }} key={value}>
            <View style={globalStyles.every}>
              <View style={globalStyles.title}>
                <Text style={globalStyles.meal}>{value}</Text>
                <AntDesign
                  name="downcircleo"
                  size={24}
                  color="#fff"
                  onPress={() => {
                    setShowList(value === showList ? null : value);
                  }}
                />
              </View>
              {showList === value && (
                <FlatList
                  data={meals.filter((meal) => meal.type === value)}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              )}
            </View>
          </TouchableHighlight>
        );
      })}

      <Detail
        handleShow={modalVisible}
        meal={mealSelected}
        handleClose={handleClose}
      />
    </View>
  );
};

export default Home;
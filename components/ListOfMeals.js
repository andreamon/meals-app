import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import firebase from "../database/firebase";
import AddMeal from "./AddMeal";
import Detail from "./Detail";

const ListOfMeals = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [meals, setMeals] = useState([]);
  const [show, setShow] = useState(false);
  const [mealSelected, setMealSelected] = useState([]);

  const handleShowModal = (meal) => {
    setMealSelected(meal);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
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

  const addMeal = (meal) => {
    meal.id = Math.random().toString();
    firebase.db.collection("meals").add(meal);
    console.log(meal);
    setModalVisible(false);
    setMeals((currentMeals) => [...currentMeals, meal]);
  };

  const Item = ({ name, type }) => (
    <View style={globalStyles.itemList}>
      <Text style={globalStyles.itemTextList}>{name}</Text>
      <Text style={globalStyles.itemSubList}>{type}</Text>
    </View>
  );
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleShowModal(item)}>
      <Item name={item.name} type={item.type} />
    </TouchableOpacity>
  );

  return (
    <>
      {meals.length < 1 ? (
        <View style={globalStyles.containerHome}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={globalStyles.containerHome}>
          <TouchableOpacity>
            <Text
              style={globalStyles.buttonAdd}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              Agregar
            </Text>
          </TouchableOpacity>
          <FlatList
            data={meals}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={globalStyles.containerMeal}>
              <AntDesign
                name="closecircleo"
                size={24}
                color="black"
                style={globalStyles.closeIcon}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <AddMeal add={addMeal} />
            </View>
          </Modal>
        </View>
      )}
      <Detail handleShow={show} meal={mealSelected} handleClose={handleClose} />
    </>
  );
};

export default ListOfMeals;
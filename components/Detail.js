import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";

const Detail = (props) => {
  return (
    <Modal visible={props.handleShow} animationType="slide" transparent={true}>
      <View style={globalStyles.containerModal}>
        <Text style={globalStyles.titleModal}>{props.meal.name}</Text>
        <ScrollView>
          <View>
            <Text style={globalStyles.textInfoModal}>
              Tipo: {props.meal.type}
              {"\n"}
              Ingredientes: {props.meal.ingredients}
            </Text>

            <TouchableOpacity>
              <Text
                style={globalStyles.buttonClose}
                onPress={props.handleClose}
              >
                Volver
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Detail;
import React from "react";
import { Formik } from "formik";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {globalStyles} from '../styles/global';
import RNPickerSelect from "react-native-picker-select";

const Meal = (props) => {
  const types = [
    { label: "Desayuno", value: "Desayuno" },
    { label: "Almuerzo", value: "Almuerzo" },
    { label: "Snack", value: "Snack" },
    { label: "Merienda", value: "Merienda" },
    { label: "Cena", value: "Cena" },
  ];
  const placeholder = {
    label: "Seleccionar el tipo de comida",
    color: "#000",
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.containerMeal}>
        <Text style={globalStyles.titleMeal}>Nueva comida</Text>
        <Formik
          initialValues={{ name: "", ingredients: "", type: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Agregar el nombre";
            }
            if (!values.ingredients) {
              errors.ingredients = "Agregar los ingredientes";
            }
            // if (!values.type) {
            //   errors.type = "This field is required";
            // }
            return errors;
          }}
          onSubmit={(values, actions) => {
            console.log(values);
            props.add(values);
          }}
        >
          {(props) => (
            <View style={globalStyles.form}>
              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerSelectStyles}
                onValueChange={(value) => {
                  props.setFieldValue('type', value);
                  console.log(value);
                }}
                placeholder={placeholder}
                items={types}
                value={props.values.type}
              />
              <TextInput
                style={globalStyles.input}
                placeholder="Nombre"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("name")}
                onBlur={props.handleBlur("name")}
                value={props.values.name}
              />
              {props.touched.name && props.errors.name ? (
                <Text style={globalStyles.messageError}>{props.errors.name}</Text>
              ) : null}
              <TextInput
                multiline
                style={globalStyles.input}
                placeholder="Ingredientes"
                placeholderTextColor="#fff"
                onChangeText={props.handleChange("ingredients")}
                onBlur={props.handleBlur("ingredients")}
                value={props.values.ingredients}
              />
              {props.touched.ingredients && props.errors.ingredients ? (
                <Text style={globalStyles.messageError}>
                  {props.errors.ingredients}
                </Text>
              ): null}
              <TouchableOpacity>
                <Text style={globalStyles.buttonSave} onPress={props.handleSubmit}>
                  Guardar!
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "#5bccb9",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    fontFamily: "montserrat",
    fontSize: 16,
    backgroundColor: "#5bccb9",
    color: "#fff",
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#5bccb9",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    fontFamily: "montserrat",
    fontSize: 16,
    backgroundColor: "#5bccb9",
    color: "#fff",
  },
});

export default Meal;

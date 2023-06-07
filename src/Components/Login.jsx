import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { database } from "../config/fb";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const benefactorsQuery = query(
        collection(database, "beneficiario"),
        where("username", "==", username)
      );

      const benefactorsSnapshot = await getDocs(benefactorsQuery);

      let isUserFound = false;

      benefactorsSnapshot.forEach((benefactorSnapshot) => {
        const benefactorData = benefactorSnapshot.data();
        if (benefactorData.password === password) {
          isUserFound = true;
          AsyncStorage.setItem("benefactor", JSON.stringify(benefactorData));

          //console.log(benefactorData)
        }
      });

      if (isUserFound) {
        navigation.navigate("Inicio");
      } else {
        alert("Beneficiario no encontrado o contraseña incorrecta");
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Iniciar sesión
      </Text>
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={{
          width: 200,
          height: 40,
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={{
          width: 150,
          height: 40,
          backgroundColor: "black",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: "white" }}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ marginTop: 20, color: "blue" }}>Crear una cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

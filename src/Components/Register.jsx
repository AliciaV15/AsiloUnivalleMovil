import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { database } from "../config/fb";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Register() {
  const navigation = useNavigation();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Nombres, setNombre] = useState("");
  const [Apellidos, setApellido] = useState("");
  const [Carnet, setCarnet] = useState("");
  const [Direccion, setDomicilio] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Email, setEmail] = useState("");

  const handleRegister = async () => {
    const benefactor = {
      Username,
      Password,
      Nombres,
      Apellidos,
      Carnet,
      Telefono,
      Email,
      Direccion,
    };
    try {
      await addDoc(collection(database, "beneficiario"), benefactor);
      alert("Registro exitoso en Firebase Firestore");
      // Realizar solicitud POST a la API
      const response = await axios.post('https://apidelasilo.azurewebsites.net/api/Benefactors',benefactor);
      // Haz lo que necesites con la respuesta de la API
      if (response.status === 201) {
        alert("Registro exitoso en la API");
        navigation.goBack();
      } else {
        alert("Error en el registro en la API");
        console.log(response);
      }
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Registro de usuario
        </Text>
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Nombre de usuario"
          value={Username}
          onChangeText={setUsername}
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Nombres"
          value={Nombres}
          onChangeText={setNombre}
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Apellidos"
          value={Apellidos}
          onChangeText={setApellido}
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Carnet de identidad"
          value={Carnet}
          onChangeText={setCarnet}
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Domicilio"
          value={Direccion}
          onChangeText={setDomicilio}
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Teléfono"
          value={Telefono}
          onChangeText={setTelefono}
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Contraseña"
          secureTextEntry
          value={Password}
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
          onPress={handleRegister}
        >
          <Text style={{ color: "white" }}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
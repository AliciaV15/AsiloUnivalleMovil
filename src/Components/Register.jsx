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

export default function Register() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [carnet, setCarnet] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    const benefactor = {
      username,
      nombre,
      apellido,
      carnet,
      domicilio,
      telefono,
      email,
      password,
    };
    try {
      await addDoc(collection(database, "beneficiario"), benefactor);
      alert("Registro exitoso");
      navigation.goBack();
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
          value={username}
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
          value={nombre}
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
          value={apellido}
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
          value={carnet}
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
          value={domicilio}
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
          value={telefono}
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
          value={email}
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
          onPress={handleRegister}
        >
          <Text style={{ color: "white" }}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

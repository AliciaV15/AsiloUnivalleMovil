import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView  } from "react-native";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [identification, setIdentification] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleRegister = () => {
      // Lógica para registrar un nuevo usuario
    };
  return (
    <>
      <ScrollView  contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
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
          value={name}
          onChangeText={setName}
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
          value={lastName}
          onChangeText={setLastName}
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
          value={identification}
          onChangeText={setIdentification}
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
          value={address}
          onChangeText={setAddress}
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
          value={phone}
          onChangeText={setPhone}
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
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderWidth: 1,
            borderRadius: 20,
            paddingHorizontal: 10,
            marginBottom: 20,
          }}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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

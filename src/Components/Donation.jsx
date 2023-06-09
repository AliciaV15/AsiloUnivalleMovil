import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "../config/fb";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function DonationForm() {
  const navigation = useNavigation();
  const [isAnonimo, setIsAnonimo] = useState(false);
  const [donationType, setDonationType] = useState("");
  const [Items, setItems] = useState("");
  let [Dinero, setDinero] = useState(0);
  const [Estado, setEstado] = useState(1);

  const [Descripcion, setDescripcion] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  var Anonimo = 0;
  var IdDonacion = 0;

  const handleDonationTypeChange = (type) => {
    setDonationType(type);
    setItems("");
    setDinero("");
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setShowTimePicker(false);
    setSelectedTime(currentTime);
  };

  const handleDonationSubmit =  async () => {
    const FechaRecojo = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );
    
    const FechaDonacion = new Date();
    const benefactorData = await AsyncStorage.getItem('benefactor');
    const campañaData = await AsyncStorage.getItem('campaña');
    const parsedBenefactorData = JSON.parse(benefactorData);
    const parsedCampañaData = JSON.parse(campañaData);
   
    const IdBenefactor = parsedBenefactorData.id.toString();
    const IdCampana = parsedCampañaData.id.toString();
    const nombreBenefactor = parsedBenefactorData.Username;
    const nombreCampana = parsedCampañaData.nombre;
    
    if(isAnonimo){
      Anonimo = 1
    }
  
    

    let donacion = {
      Descripcion,
      Anonimo,
      Estado,
      Dinero,
      Items,
      FechaDonacion,
      FechaRecojo,
      IdBenefactor,
      IdCampana,
      IdDonacion
      
    };
    let donacionA = {
      Descripcion,
      Anonimo,
      Estado,
      Dinero,
      Items,
      FechaDonacion,
      FechaRecojo,
      IdBenefactor,
      IdCampana,
      
    };
    
    try {
      const IdDon = await fetch(
        `https://apidelasilo.azurewebsites.net/api/DonationsLastId`
      );

      const data = await IdDon.json();
      console.log(data)
      donacion.IdDonacion = data + 1;
      await addDoc(collection(database, "donacion"), donacion);
      //
      const buscarBenefactorPorNombre = async (nombre) => {
        try {
          const benefactorResponse = await axios.get(
            `https://apidelasilo.azurewebsites.net/api/Benefactors`
          );
        
          const benefactores = benefactorResponse.data;
        
      
          // Buscar el benefactor por su nombre
          const benefactorEncontrado = benefactores.find(
            (benefactor) => benefactor.username == nombre
          );
      
          if (benefactorEncontrado) {
            return benefactorEncontrado.idBenefactor;
          } else {
            return null; // Retornar null si no se encontró el benefactor
          }
        } catch (error) {
          console.error("Error al buscar el benefactor:", error);
          return null; // Retornar null en caso de error
        }
      };
      
      
      
      //
      
      
      // Ejemplo de uso:
     
      const idBenefactorB = await buscarBenefactorPorNombre(nombreBenefactor);
      const idCampanaB = parsedCampañaData.idcamp;
      donacionA.IdBenefactor = idBenefactorB;
      donacionA.IdCampana = idCampanaB;
      if(donacionA.Dinero == ""){
        donacionA.Dinero = 0
      }
       const response = await axios.post(
         "https://apidelasilo.azurewebsites.net/api/Donacions",
         donacionA
       );
       alert("Registro exitoso ");
       navigation.goBack();
      
      
     
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar donación</Text>

      <CheckBox
        title="¿Es anónimo?"
        checked={isAnonimo}
        onPress={() => setIsAnonimo(!isAnonimo)}
      />

      <Text style={styles.label}>Tipo de donación</Text>
      <TouchableOpacity
        style={[
          styles.radioOption,
          donationType === "Items" && styles.radioOptionSelected,
        ]}
        onPress={() => handleDonationTypeChange("Items")}
      >
        <Text style={styles.radioOptionText}>Items</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.radioOption,
          donationType === "Dinero" && styles.radioOptionSelected,
        ]}
        onPress={() => handleDonationTypeChange("Dinero")}
      >
        <Text style={styles.radioOptionText}>Dinero</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.radioOption,
          donationType === "Ambos" && styles.radioOptionSelected,
        ]}
        onPress={() => handleDonationTypeChange("Ambos")}
      >
        <Text style={styles.radioOptionText}>Ambos</Text>
      </TouchableOpacity>

      {(donationType === "Items" || donationType === "Ambos") && (
        <TextInput
          style={styles.input}
          placeholder="Registrar items"
          value={Items}
          onChangeText={setItems}
        />
      )}

      {(donationType === "Dinero" || donationType === "Ambos") && (
        <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Registrar dinero"
        value={parseFloat(Dinero)}
        onChangeText={(text) => setDinero(parseFloat(text))}
        
      />
      )}

      <TextInput
        style={styles.textarea}
        placeholder="Descripción"
        multiline={true}
        value={Descripcion}
        onChangeText={setDescripcion}
      />

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerButtonText}>
          Fecha de recojo: {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity
        style={styles.timePickerButton}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.timePickerButtonText}>
          Hora de recojo: {selectedTime.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleDonationSubmit}
      >
        <Text style={styles.submitButtonText}>Registrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  radioOptionSelected: {
    backgroundColor: "lightblue",
    borderColor: "lightblue",
  },
  radioOptionText: {
    fontSize: 16,
    marginLeft: 8,
  },
  input: {
    width: "100%",
    height: 40,
    marginTop: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textarea: {
    width: "100%",
    height: 80,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlignVertical: "top",
  },
  datePickerButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  datePickerButtonText: {
    fontSize: 16,
  },
  timePickerButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  timePickerButtonText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "black",
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
};
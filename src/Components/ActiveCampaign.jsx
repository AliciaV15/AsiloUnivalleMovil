import * as RN from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { database } from "../config/fb";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default function ActiveCampaign() {
  const navigation = useNavigation();
  const [campaign, setCampaign] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "campaings");
   
    const q = query(collectionRef, orderBy("FechaInicio", "asc"));
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      
      const currentDate = new Date();
      const filteredCampaigns = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          nombre: doc.data().Nombre,
          requerimiento: doc.data().Requerimiento,
          beneficiario: doc.data().Beneficiario,
          urlImagen: doc.data().UrlImagen,
          fechaInicio: doc.data().FechaInicio.toDate(),
          fechaFin: doc.data().FechaFin.toDate(),
          idAsilo: doc.data().IdAsilo,
          estado: doc.data().Estado,
          idcamp: doc.data().IdCampana

          
        }))
        .filter((item) => item.fechaFin > currentDate && item.estado == 0);
      setCampaign(filteredCampaigns);
    
    });

    return unsuscribe;
  }, []);
  const handleDonar = async (item) => {
    try {
      // Verificar si existe una campaña guardada
      const campaignData = await AsyncStorage.getItem("campaña");
      if (campaignData !== null) {
        // Si existe una campaña guardada, borrarla
        await AsyncStorage.removeItem("campaña");
      }
      // Guardar la nueva campaña
      await AsyncStorage.setItem("campaña", JSON.stringify(item));
      // Navegar a la pantalla de donación
      navigation.navigate("Donation");
    } catch (error) {
      console.log("Error al manejar la donación:", error);
    }
  };
  const getBeneficiarioIcon = (beneficiario) => {
    let iconName;

    if (beneficiario === 0) {
      iconName = "user";
    } else if (beneficiario === 1) {
      iconName = "addusergroup";
    } else if (beneficiario === 2) {
      iconName = "home";
    } else {
      iconName = "user"; // Icono predeterminado si el valor no coincide con ninguna opción
    }

    return iconName;
  };

  return (
    <RN.ScrollView>
      {campaign.map((item) => (
        <RN.View key={item.id} style={styles.productContainer}>
          <RN.View style={styles.imageContainer}>
            <RN.Image source={{ uri: item.urlImagen }} style={styles.image} />
          </RN.View>

          <RN.Text style={styles.name}>{item.nombre}</RN.Text>
          <RN.Text style={styles.fechas}>
            Inicio: {item.fechaInicio.toLocaleDateString()}
          </RN.Text>
          <RN.Text style={styles.fechas}>
            Cierre: {item.fechaFin.toLocaleDateString()}
          </RN.Text>
          <RN.Text style={styles.price}>{item.requerimiento}</RN.Text>
          <AntDesign
            name={getBeneficiarioIcon(item.beneficiario)}
            size={24}
            color="lightblue"
          />
          <RN.TouchableOpacity
            style={styles.button}
            onPress={() => handleDonar(item)}
          >
            <RN.Text style={styles.buttonText}>Donar </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      ))}
    </RN.ScrollView>
  );
}
const styles = RN.StyleSheet.create({
  productContainer: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },

  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#0FA5E9",
  },
  price: {
    fontSize: 17,

    color: "gray",
  },
  button: {
    backgroundColor: "#0FA5E9",
    padding: 8,
    marginVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  fechas: {
    fontSize: 14,
    color: "gray",
    fontWeight: "bold",
  },
  imageContainer: {
    margin: 10,
    height: 100,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

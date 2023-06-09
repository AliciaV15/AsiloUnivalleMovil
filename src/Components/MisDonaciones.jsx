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

export default function MisDonaciones() {
  const navigation = useNavigation();
  const [campaign, setCampaign] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const benefactorData = await AsyncStorage.getItem("benefactor");
        const parsedBenefactorData = JSON.parse(benefactorData);
        const IdBenefactor = parsedBenefactorData.id.toString();

        const collectionRef = collection(database, "donacion");

        const q = query(collectionRef, orderBy("FechaDonacion", "asc"));
        const unsuscribe = onSnapshot(q, (querySnapshot) => {


          const filteredCampaigns = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              descripcion: doc.data().Descripcion,
              IdBenefactor: doc.data().IdBenefactor,
              Dinero: doc.data().Dinero,
              Items: doc.data().Items,
              FechaDonacion: doc.data().FechaDonacion.toDate(),

              Anonimo: doc.data().Anonimo,
              // estado: doc.data().Estado,
              // idcamp: doc.data().IdCampana


            }))
            .filter((item) => item.IdBenefactor == IdBenefactor);
          setCampaign(filteredCampaigns);

        });

        return unsuscribe;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
          {/* <RN.View style={styles.imageContainer}>
            <RN.Image source={{ uri: item.urlImagen }} style={styles.image} />
          </RN.View> */}
          <RN.Text style={styles.name}>Tu Donación</RN.Text>
          <RN.Text style={styles.price}> Descripción: {item.descripcion}</RN.Text>
          <RN.Text style={styles.fechas}>
            Se realizó el: {item.FechaDonacion.toLocaleDateString()}
          </RN.Text>
          <RN.Text style={styles.Anon}>
  {item.Anonimo === 1 ? 'Donación Anónima' : 'Donación Pública'}
</RN.Text>
<RN.Text style={styles.don}>
 {item.Dinero !== "" ? "Donación Monetaria:" +item.Dinero : ''}
</RN.Text>
<RN.Text style={styles.don}>
  {item.Items !== "" ? "ItemsDonados" + item.Items : ''}
</RN.Text>
          {/* 
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
          </RN.TouchableOpacity> */}
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
  Anon: {
    fontSize: 15,
    fontWeight: "bold",
    
    color: "gray",
  },
  don: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  fechas: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#0FA5E9",
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

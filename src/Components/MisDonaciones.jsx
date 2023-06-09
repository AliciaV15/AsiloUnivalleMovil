import * as RN from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { database } from "../config/fb";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export default function MisDonaciones() {
  const [donacion, setDonacion] = useState([]);
  const [campana, setCampana] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const benefactorData = await AsyncStorage.getItem("benefactor");
        const parsedBenefactorData = JSON.parse(benefactorData);
        const IdBenefactor = parsedBenefactorData.id.toString();

        const donacionCollectionRef = collection(database, "donacion");
        const campanaCollectionRef = collection(database, "campana");

        const donacionQuery = query(donacionCollectionRef);

        const campanaQuery = query(campanaCollectionRef);

     

        const unsubscribeDonacion = onSnapshot(
          donacionQuery,
          (donacionSnapshot) => {
            const donaciones = donacionSnapshot.docs
              .map((donacionDoc) => ({
                id: donacionDoc.id,
                descripcion: donacionDoc.data().Descripcion,
                anonimo: donacionDoc.data().Anonimo,
                estado: donacionDoc.data().Estado,
                dinero: donacionDoc.data().Dinero,
                items: donacionDoc.data().Items,
                fechaDonacion: donacionDoc.data().FechaDonacion.toDate(),
                fechaRecojo: donacionDoc.data().FechaRecojo.toDate(),
                idCampana: donacionDoc.data().IdCampana,
                idBenefactor: donacionDoc.data().IdBenefactor,
                
              }))
              .filter((item) => item.idBenefactor == IdBenefactor);
            setDonacion(donaciones);
          }
        );

        

        
        
        return unsubscribeDonacion;
        // return () => {
        //   unsubscribeDonacion();
        //   unsubscribeCampana();
        // };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      {donacion.map((item) => (
        <RN.Text key={item.id}>{item.campana.Nombre}</RN.Text>
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

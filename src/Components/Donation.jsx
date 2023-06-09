import * as RN from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { database } from "../config/fb";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import NewDonation from './NewDonation';

export default function DonationList() {
    const navigation = useNavigation();
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const collectionRef = collection(database, "DONACION");
        const q = query(collectionRef, orderBy("fechaDonacion", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const donationData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                descripcion: doc.data().descripcion,
                anonimo: doc.data().anonimo,
                estado: doc.data().estado,
                dinero: doc.data().dinero,
                items: doc.data().items,
                fechaDonacion: doc.data().fechaDonacion.toDate(),
                fechaRecojo: doc.data().fechaRecojo.toDate(),
                idCampania: doc.data().ID_campania,
                idBenefactor: doc.data().ID_benefactor,
            }));
            setDonations(donationData);
        });

        return unsubscribe;
    }, []);

    const handleDonation = (item) => {
        navigation.navigate("DonationDetails", { donation: item });
    };

    const handleAddDonation = () => {
        navigation.navigate("NewDonation");
    };

    return (
        <RN.View style={{ flex: 1 }}>
            <RN.ScrollView>
                {donations.map((item) => (
                    <RN.View key={item.id} style={styles.donationContainer}>
                        <RN.Text style={styles.description}>{item.descripcion}</RN.Text>
                        <RN.Text style={styles.date}>
                            Fecha de donación: {item.fechaDonacion.toLocaleDateString()}
                        </RN.Text>
                        <RN.Text style={styles.status}>
                            Estado: {item.estado === 1 ? "Activa" : "Inactiva"}
                        </RN.Text>
                        {item.dinero && (
                            <RN.Text style={styles.amount}>Monto: ${item.dinero}</RN.Text>
                        )}
                        {item.items && (
                            <RN.Text style={styles.items}>Artículos: {item.items}</RN.Text>
                        )}
                        <RN.TouchableOpacity
                            style={styles.button}
                            onPress={() => handleDonation(item)}
                        >
                            <RN.Text style={styles.buttonText}>Ver detalles</RN.Text>
                        </RN.TouchableOpacity>
                    </RN.View>
                ))}
            </RN.ScrollView>
            <RN.TouchableOpacity style={styles.addButton} onPress={handleAddDonation}>
                <AntDesign name="pluscircle" size={50} color="#0FA5E9" />
            </RN.TouchableOpacity>
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({
    donationContainer: {
        padding: 16,
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 8,
    },
    description: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: "gray",
    },
    status: {
        fontSize: 14,
        color: "gray",
    },
    amount: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
    },
    items: {
        fontSize: 16,
        marginTop: 8,
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
    addButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
    },
});

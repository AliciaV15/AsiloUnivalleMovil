import * as RN from "react-native";
import React, { useState } from "react";
import { database } from "../config/fb";
import { collection, addDoc } from "firebase/firestore";


export default function NewDonation() {
    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState("");
    const [items, setItems] = useState("");
    const [userID, setUserID] = useState("");

    const handleDonation = async () => {
        try {



            const donationData = {
                descripcion,
                dinero: parseFloat(monto),
                items,
                fechaDonacion: new Date(),
                estado: 1, // Estado activo
                ID_campania: 1, // ID de la campa�a asociada
                ID_benefactor: user, // ID del benefactor asociado
            };

            const donationRef = collection(database, "DONACION");
            await addDoc(donationRef, donationData);

            // L�gica adicional despu�s de realizar la donaci�n

            // Limpiar los campos de la donaci�n
            setDescripcion("");
            setMonto("");
            setItems("");

            // Mostrar una notificaci�n o redireccionar a otra vista
            RN.Alert.alert("Donaci�n realizada", "�Gracias por tu generosidad!");

        } catch (error) {
            console.error("Error al realizar la donaci�n:", error);
            // Mostrar un mensaje de error al usuario si es necesario
        }
    };

    return (
        <RN.View style={styles.container}>
            <RN.Text style={styles.label}>Descripcion:</RN.Text>
            <RN.TextInput
                style={styles.input}
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <RN.Text style={styles.label}>Monto (opcional):</RN.Text>
            <RN.TextInput
                style={styles.input}
                value={monto}
                onChangeText={setMonto}
                keyboardType="numeric"
            />

            <RN.Text style={styles.label}>Articulos (opcional):</RN.Text>
            <RN.TextInput
                style={styles.input}
                value={items}
                onChangeText={setItems}
            />

            <RN.Button title="Realizar Donacion" onPress={handleDonation} />
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});
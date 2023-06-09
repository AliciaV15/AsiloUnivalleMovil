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
                ID_campania: 1, // ID de la campaña asociada
                ID_benefactor: user, // ID del benefactor asociado
            };

            const donationRef = collection(database, "DONACION");
            await addDoc(donationRef, donationData);

            // Lógica adicional después de realizar la donación

            // Limpiar los campos de la donación
            setDescripcion("");
            setMonto("");
            setItems("");

            // Mostrar una notificación o redireccionar a otra vista
            RN.Alert.alert("Donación realizada", "¡Gracias por tu generosidad!");

        } catch (error) {
            console.error("Error al realizar la donación:", error);
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
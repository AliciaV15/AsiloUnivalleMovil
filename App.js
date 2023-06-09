import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Components/Login';
import Inicio from './src/Components/Inicio';
import Register from './src/Components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/Components/SplashScreen';
import Donation from './src/Components/Donation';
import NewDonation from './src/Components/NewDonation';

const Stack = createStackNavigator();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simula una tarea de carga o inicialización
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    if (isLoading) {
        return <SafeAreaProvider><SplashScreen /></SafeAreaProvider>;
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Inicio" component={Inicio} />
                    <Stack.Screen name="Donation" component={Donation} />
                    <Stack.Screen name="NewDonation" component={NewDonation} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

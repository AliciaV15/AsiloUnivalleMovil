import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ActiveCampaign from './ActiveCampaign';
import CloseCampaign from './CloseCampaign';
import DonationList from './Donation';
import NewDonation from './NewDonation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();
export default function Inicio() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Campañas Activas" component={ActiveCampaign} options={{
          tabBarLabel: 'Campañas Activas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="table" color={color} size={size} />
          )
         
        }}/>
      <Tab.Screen name="Campañas Cerradas" component={CloseCampaign} options={{
          tabBarLabel: 'Campañas Cerradas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="table-cancel" color={color} size={size} />
          )
         
          }} />
   
          <Tab.Screen name="Donaciones" component={DonationList} options={{
              tabBarLabel: 'Donaciones',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="hand-coin" color={color} size={size} />
              ),
            
          }} />
        
    </Tab.Navigator>

    )


}
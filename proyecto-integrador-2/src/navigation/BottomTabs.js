import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
export default function BottomTabs(){
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>

            <Tab.Screen name='Home' component={Home} options={{tabBarIcon:()=> <FontAwesome name='home' size={24} color={'grey'}/>}}/>


        </Tab.Navigator>
    )
}
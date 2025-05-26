import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesome} from '@expo/vector-icons'
import Home from '../screens/Home'
import AddPost from '../screens/AddPost'

const Tab = createBottomTabNavigator()
export default function BottomTabs(){
    return(
        <Tab.Navigator >
            <Tab.Screen name='Home' component={Home} options={{headerShown: false, tabBarIcon:()=> <FontAwesome name='home' size={24} color={'grey'}/>}}/>
            <Tab.Screen name='AddPost' component={AddPost} options={{headerShown: false, tabBarIcon:()=> <FontAwesome name='plus' size={24} color={'grey'}/>}}/>
        </Tab.Navigator>
    )
}
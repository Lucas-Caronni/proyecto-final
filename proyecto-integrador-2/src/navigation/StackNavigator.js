import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs'
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator()

export default function AppNavigator(){
    return(
        <Stack.Navigator>

            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name="Tab" component={BottomTabs} />

        </Stack.Navigator>
    )
}
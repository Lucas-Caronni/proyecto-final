import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs'
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator()

export default function AppNavigator(){
    return(
        <Stack.Navigator>

            <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
            <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="Tab" component={BottomTabs} options={{headerShown: false}}/>

        </Stack.Navigator>
    )
}
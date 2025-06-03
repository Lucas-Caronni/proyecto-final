import React from 'react'
import { StyleSheet } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator'

export default function App() {
  return (
    <NavigationContainer>

      <StackNavigator />
    
    </NavigationContainer>

    
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})

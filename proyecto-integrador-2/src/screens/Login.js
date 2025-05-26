import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

redireccionar = (screenName)=>{
    const navigation = this.props.navigation;
    navigation.navigate((screenName))
    }

componentDidMount(){
  auth.onAuthStateChanged((user) => {
    if(user){
      this.props.navigation.navigate('Tab')
    }
  })
} //esto lo que va a hacer es mandarme derecho a tab si ya estoy con la sesion iniciada

loguearUsuario(email, password){
    if ((email !== '' &&
        password !== '')
        && password.length >= 6 && email.includes('@')
        ){
            auth.signInWithEmailAndPassword(email, password)
            .then(()=> {
                this.redireccionar('Tab')
            })
            .catch((err) => console.log('err:', err))
            }
        }
    
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                <Text style={styles.title}>Iniciar Sesión</Text>
        
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="#999"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    />
        
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    />
        
                
                <TouchableOpacity
                    style={[styles.button, styles.greenButton]}
                    onPress={() => this.loguearUsuario(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
        
        
                <TouchableOpacity
                    style={[styles.button, styles.blueButton]}
                    onPress={() => this.redireccionar('Register')}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>
            
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },
  
    card: {
      width: '85%',
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  
    input: {
      height: 50,
      borderColor: '#28a745',
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 15,
      paddingHorizontal: 10,
      fontSize: 16,
      backgroundColor: '#f9f9f9',
    },
  
    button: {
      padding: 10,
      marginVertical: 10,
      borderRadius: 4,
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
    blueButton: {
      backgroundColor: '#4A90E2',
    },
  
    greenButton: {
      backgroundColor: '#28a745',
    },
  
  })
  
  
  
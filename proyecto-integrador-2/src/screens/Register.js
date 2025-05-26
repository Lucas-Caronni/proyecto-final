import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../firebase/config'

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      username:''
    }
  }
  redireccionar = (screenName)=>{
    const navigation = this.props.navigation;
    navigation.navigate((screenName))
  }

  registarUsuario(email, password, username){
    console.log('datos', email, password, username)
    if ((email !== '' 
        &&
        password !== ''
        && username !== '')
        && password.length >= 6 
        && email.includes('@')
        && username.length >= 3
        ){
        auth.createUserWithEmailAndPassword(email, password)
        .then(()=> {

          db.collection('users').add({
            owner: email,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            username: username,
          })
          .then(()=>{
            this.redireccionar('Login')
         })
        })
        .catch((err) => console.log('err:', err))
        }
        else {
            console.log('error en el else')
        }
    } 
   
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Registrarme</Text>

            <TextInput 
            style={styles.input}
            keyboardType='email-address'
            placeholder='Email'
            placeholderTextColor="#999"
            onChangeText={(text)=>this.setState({email:text})}
            value={this.state.email}
            />

            <TextInput 
            style={styles.input}
            keyboardType='default'
            placeholder='Username'
            placeholderTextColor="#999"
            onChangeText={(text)=>this.setState({username:text})}
            value={this.state.username}
            />

            <TextInput 
            style={styles.input} 
            placeholder='Password'
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={(text)=>this.setState({password:text})}
            value={this.state.password}
            />
          
            <TouchableOpacity
            style={[styles.button, styles.greenButton]}
            onPress={()=> this.registarUsuario(this.state.email, this.state.password, this.state.username)}>
            <Text style={styles.buttonText}>Registrarme</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.button, styles.blueButton]}
            onPress={()=> this.redireccionar('Login')}>
            <Text style={styles.buttonText}>Ya tengo cuenta</Text>
            </TouchableOpacity>

        </View>
      </View>
    )
  } 
}
const styles = StyleSheet.create({
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
  button: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: '#28a745',
  },
  blueButton: {
    backgroundColor: '#4A90E2',
    justifyContent:'center',
    alignItems:'center'
  },
  greenButton: {
    backgroundColor: '#5cb85c',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-web'
import { auth, db } from '../firebase/config'

export default class AddPost extends Component {
    constructor(props){
        super(props)
        this.state={
            comentario: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
          if(user){
            console.log(user);
          }
        })
      }

    crearPost(comentario){
        console.log(comentario);
        if(comentario !== ''){
            db.collection('posts').add({
                owner:  auth.currentUser.email,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                description: comentario
            })
            .then(()=>{
                this.props.navigation.navigate('Home')
            })
        } else {
            console.log('error en el else');
        }
    }


    render() {
        return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}> Create Post </Text>
                <TextInput 
                placeholder='Write whatever you want'
                placeholderTextColor="#999"
                onChangeText={(text)=>this.setState({comentario:text})}
                value={this.state.comentario}
                />

                <TouchableOpacity
                style={[styles.button, styles.greenButton]}
                onPress={()=> this.crearPost(this.state.comentario)}
                >
                    <Text>Crear</Text>
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
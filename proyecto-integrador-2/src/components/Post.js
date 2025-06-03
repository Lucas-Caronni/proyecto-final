import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meGusta: false,
            cantMeGusta: this.props.data.likes? this.props.data.likes.length : 0,
        }
    }

    componentDidMount() {
        if (this.props.data.likes) {
            const meGusta = this.props.data.likes.includes(auth.currentUser.email)
            this.setState({
                meGusta: meGusta
            })
        }
    }

    likearPost() {
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState({
                meGusta: true,
                cantMeGusta: this.state.cantMeGusta + 1
            }))
    }

    unlikePost() {
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => this.setState({
                meGusta: false,
                cantMeGusta: this.state.cantMeGusta - 1
            }))
    }

    borrarPost() {
        db.collection('posts').doc(this.props.id).delete()
            .then(() => console.log('Eliminado'))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.description}>{this.props.data.description}</Text>
                <Text style={styles.owner}>From: {this.props.data.owner}</Text>

                <Text style={styles.likes}>Cantidad de me gusta: {this.state.cantMeGusta}</Text>

                {
                    this.state.meGusta ?
                        <TouchableOpacity style={styles.button} onPress={() => this.unlikePost()}>
                            <Text style={styles.buttonText}>Ya no me gusta</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={() => this.likearPost()}>
                            <Text style={styles.buttonText}>Me gusta</Text>
                        </TouchableOpacity>
                }

                {/* Mostrar botón de borrar solo si el post es del usuario actual */}
                {
                    this.props.data.owner === auth.currentUser.email ?
                        <TouchableOpacity style={styles.deletePost} onPress={() => this.borrarPost()}>
                            <Text style={styles.buttonText}>Borrar posteo</Text>
                        </TouchableOpacity>
                        : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        margin: 10,                 
        padding: 10,                
        borderRadius: 8,
        width: '50%',
        alignSelf: 'center',
        shadowColor: '#000'    
      },
      description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
      },
      owner: {
        fontSize: 14,
        color: '#333',
        marginBottom: 3
      },
      likes: {
        fontSize: 14,
        marginBottom: 10,
      },
      button: {
        backgroundColor: '#007AFF', 
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 3,
        marginBottom: 10
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      deletePost: {
        backgroundColor: '#FF3B30',  
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 3,
        marginBottom: 10
      }
})
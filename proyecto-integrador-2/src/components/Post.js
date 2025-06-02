import { View, Text, TouchableOpacity } from 'react-native'
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
            <View>
                <Text>{this.props.data.description}</Text>
                <Text>{this.props.data.owner}</Text>

                <Text>Cantidad de me gusta: {this.state.cantMeGusta}</Text>

                {
                    this.state.meGusta ?
                        <TouchableOpacity onPress={() => this.unlikePost()}>
                            <Text>Ya no me gusta</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.likearPost()}>
                            <Text>Me gusta</Text>
                        </TouchableOpacity>
                }

                {/* Mostrar botón de borrar solo si el post es del usuario actual */}
                {
                    this.props.data.owner === auth.currentUser.email ?
                        <TouchableOpacity onPress={() => this.borrarPost()}>
                            <Text>Borrar posteo</Text>
                        </TouchableOpacity>
                        : null
                }
            </View>
        )
    }
}

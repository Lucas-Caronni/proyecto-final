import React, { Component } from 'react'
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native'
import {auth, db} from '../firebase/config'
import firebase from 'firebase'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
        posteos: [],
        loading: true,
        cantMeGusta: 0,
        likes: false
    }
  }

  componentDidMount(){
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot((docs)=>{
        let posts = [];
        docs.forEach((doc)=> posts.push({
            id: doc.id,
            data: doc.data()
        }))
        this.setState({
            posteos: posts
        }, () => console.log('El state (los posteos)', this.state)) ////este segundo parametro es oara ver que quedo en el estado (los posteos que hay)
    })
}

  likearPost(){
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

    unlikePost(){
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
 //La lista de los posteos ya esta creada en orden de los mas recientes primero, ahora hay que mostralo en el return con un .map() y que se renderice uno por uno con un componente de Post.js
  render() {
    return (
      <View>
        <Text style={styles.titulo}> Snapgram </Text>
        <Text>Cantidad de me gusta: {this.state.cantMeGusta}</Text>
       
        {
            this.state.meGusta ?
            <TouchableOpacity
                onPress={() => this.likearPost()}
            >
                <Text>
                    Me gusta
                </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
                onPress={() => this.unlikePost()}
            >
                <Text>
                   Me gusta
                </Text>
            </TouchableOpacity>
        }
             
      </View>
    )
  }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 32,
        textAlign: 'center'
    }
})
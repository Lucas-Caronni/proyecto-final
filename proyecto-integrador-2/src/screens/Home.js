import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import {auth, db} from '../firebase/config'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
        posteos: [],
        loading: true
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
 //La lista de los posteos ya esta creada en orden de los mas recientes primero, ahora hay que mostralo en el return con un .map() y que se renderice uno por uno con un componente de Post.js
  render() {
    return (
      <View>
        <Text style={styles.titulo}> Snapgram </Text>
        
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
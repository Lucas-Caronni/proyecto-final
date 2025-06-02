import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../firebase/config'
import Post from '../components/Post'


export default class Perfil extends Component {
  constructor(props){
    super(props)
    this.state = {
        usuario: [],
        posteos: []
    }
    
  }

  componentDidMount(){
    db.collection('users')
    .where('owner', '==', auth.currentUser.email)
    .onSnapshot((docs) => {
        let arrDocs = []
        docs.forEach((doc) => arrDocs.push({
            id: doc.id,
            data: doc.data()
        }))
        this.setState({
            usuario: arrDocs
        },
        () => console.log('state', this.state))
    })

    db.collection('posts')
    .where('owner', '==', auth.currentUser.email)
    .onSnapshot((docs) => {
        let post = []
         docs.forEach((doc) => post.push({
            id: doc.id,
            data: doc.data()
        }))
        this.setState({
            posteos: post
        })
    })

  }

  logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('Login'))
    .catch(err => console.log('err en signout', err))
  }
  
  render(){
    return (
      <View>
        <Text>Perfil</Text>

        <FlatList
        data = {this.state.usuario}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) =><View> <Text>{item.data.username}</Text> <Text>{item.data.owner}</Text></View>}
        />

         <Text>Posteos</Text>
        {this.state.posteos.length === 0 ? 
        (<Text>No tenes posteos</Text>) : (
        <FlatList
         data={this.state.posteos}
         keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <Post id={item.id} data={item.data} />
        )}/>)     
        }

        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
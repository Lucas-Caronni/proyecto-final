import { View, Text, TouchableOpacity, FlatList, StyleShee, StyleSheet } from 'react-native'
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
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.header}>
          <FlatList
          data = {this.state.usuario}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =><View style={styles.userItem}> <Text style={styles.userText}>{item.data.username}</Text> <Text style={styles.userText}>{item.data.owner}</Text></View>}
          />
        </View>

          <Text style={styles.userText}>Posteos:</Text>
          {this.state.posteos.length === 0 ? 
          (<Text style={styles.userText}>No tenes posteos</Text>) : (
          <FlatList
          style={styles.postCard}
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
          <Post id={item.id} data={item.data} />
          )}/>)     
        }

        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutText}>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  card: {
    flex: 1,
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
  header: {
    marginBottom: 10
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  userItem: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    color: '#333'
  },
  logoutButton: {
    backgroundColor: '#f4a261',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  }

})
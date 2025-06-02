import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../firebase/config'

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    borrarPost(){
        db.collection('posts').doc(this.props.id).delete()
        .then(() => console.log('Eliminado'))
        .catch(error => console.log(error))
    }

    render(){
        return(
            <View>
                <Text>{this.props.data.post}</Text>
                <Text>{this.props.data.description}</Text>
                <TouchableOpacity onPress={() => this.borrarPost()}>
                    <Text>Borrar posteos</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
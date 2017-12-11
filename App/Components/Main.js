import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  AppRegistry,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Note from './Note';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }
  }
  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key} keyval={key} val={val} 
              deleteMethod={()=> this.deleteNote(key)} />
    });
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}> ESY NOTES </Text>
          <Text style={styles.subheaderText}>Simple Enter a note to save it.</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>
        
        <View style={styles.footer}>
          <TextInput 
            style={styles.textInput} 
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholder='Enter your Note here:'
            placeholderTextColor='white'
            underlineColorAndroid='transparent' >
          </TextInput>
        </View>

        <TouchableOpacity onPress={ this.addNote.bind(this)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Save</Text>
        </TouchableOpacity>

      </View>
    );
  }

  addNote() {    
    if(this.state.noteText){
      var d = new Date();
      this.state.noteArray.push({
        'date': d.getFullYear() +
        "/"+(d.getMonth() + 1) +
        "/" + d.getDate(),
        'note':this.state.noteText
      });
      this.setState({noteArray: this.state.noteArray})
      this.setState({ noteText: '' })
    }
  }
  deleteNote(key){
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray: this.state.noteArray })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    padding: 30,
  },
  subheaderText:{
    color: 'white',
    fontSize: 15,
    padding: 8,
  },
  scrollContainer:{
    flex: 1,
    marginBottom: 100,
  },
  footer:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, 
  },
  textInput:{
    position: 'relative', 
    alignSelf:'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed', 
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 12,
    bottom: 15,
    backgroundColor: 'green',
    width: 100,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText:{
    color: '#fff',
    fontSize: 12,
  },

});

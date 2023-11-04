import * as React from 'react';
import { View, Alert,TextInput, Text, StyleSheet, Pressable   } from 'react-native';


import LogoExample from '../components/Logo.js';
import Menu from '../components/Menu.js';

function PacientesVista({ navigation }) {
  return (
    <View style={styles.container} >

    <View style={styles.view}> 
    <LogoExample/> 
    </View>


    <Text style={styles.title}> 
    Pacientes
    </Text>

    <View style={styles.card}>


    <Pressable  style={styles.buttonR} onPress={() => navigation.navigate('Crear-Paciente')}>
      <Text  style={styles.textR}>
        Registrar Nuevo Paciente
        
        </Text>
     </Pressable>

      </View>


      <View style={styles.menu}>

    <Menu/>
    </View>

    </View>
  );
}

export default PacientesVista;




const styles = StyleSheet.create({

  container:{
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  view: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    color: 'red',
    margin: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  card: {
    alignItems: 'center',
    justifyContent: 'top',
    flex: 8,
    backgroundColor: '#fff'
  },

  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    
    flexDirection: 'row',
    backgroundColor: '#fff'
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 2
  },
  
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'red',
  },


  textR: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  input: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
    borderRadius: 6,
    height: 40,
    width: 200,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20
  },

  notas: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
    borderRadius: 6,
    height: 100,
    width: 200,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20
  },

  buttonR: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: 'red',
    margin: 4
  },
});

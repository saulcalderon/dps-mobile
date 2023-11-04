import * as React from 'react';
import { Button, View, Text, StyleSheet, Pressable  } from 'react-native';
import LogoExample from '../components/Logo.js';

function Inicio({ navigation }) {
  return (
        <View  style={styles.container}>

        <View style={styles.card}>
           <LogoExample/>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text}>Iniciar Sesión</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.navigate('Registro')}>
            <Text style={styles.text}>Registrarse</Text>
          </Pressable>
      </View>     

    </View>
    
  );
}
export default Inicio;


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
       margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    card: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 9,
      backgroundColor: '#fff'
    },

    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: 200,
      borderRadius: 6,
      elevation: 3,
      backgroundColor: 'red',
      margin: 20
    }, 

    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      }

  });
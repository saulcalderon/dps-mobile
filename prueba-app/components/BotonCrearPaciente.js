import * as React from 'react';
import { View, Alert,TextInput, Text, StyleSheet, Pressable   } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function BotonCrearPaciente (){
    const navigation = useNavigation();
    return(
        <View style={styles.container}>


        <Pressable  style={styles.button} onPress={() => navigation.navigate('Crear-Paciente')}>
          <Text  style={styles.text}>
           Registrar Nuevo Paciente
            
            </Text>
         </Pressable>
    
          </View>

    );
}

export default BotonCrearPaciente;

const styles = StyleSheet.create({

    container:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },

    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: 200,
      borderRadius: 6,
      backgroundColor: 'red',
      margin: 2
    },
    
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },

  });
  
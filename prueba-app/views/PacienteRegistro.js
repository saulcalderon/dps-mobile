import * as React from 'react';
import { View, Alert,TextInput, Text, StyleSheet, Pressable   } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogoExample from '../components/Logo.js';
import Menu from '../components/Menu.js';

function PacienteRegistro({ navigation }) {
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    notes: null,
  });

  const handleCreatePatient = async () => {
    if (!form.firstName || !form.lastName || !form.birthDate) {
      Alert.alert(
        "Por favor llene los siguientes campos: Nombres, Apellidos, Fecha de nacimiento"
      );
      return;
    }

    const token = await AsyncStorage.getItem('userToken');

    fetch(process.env.API_URL + "/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(form),
    })
      .then((response) =>
        response.status === 201 ? response : Promise.reject(response)
      )
      .then((data) => {
        Alert.alert("Registro exitoso", "Paciente registrado", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Pacientes"),
          },
        ]);
      })
      .catch((error) => {
        if (error?.status === 400) {
          error.json().then((body) => {
            Alert.alert("Error", body?.message?.join(", "));
          });
          return;
        }

        if (error?.status === 409) {
          Alert.alert("Error", "El paciente ya existe");
          return;
        }

        Alert.alert("Error", "Ocurrió un error al registrar el paciente");
      });
  };


  return (
    <View style={styles.container} >

    <View style={styles.view}> 
    <LogoExample/> 
    </View>


    <Text style={styles.title}> 
    Registrar Paciente
    </Text>

    <View style={styles.card}>

      <TextInput style={styles.input}
      onChangeText={text => setForm({...form, firstName: text})}
      placeholder="  Nombres"/>

     <TextInput style={styles.input}
      onChangeText={text => setForm({...form, lastName: text})}
      placeholder="  Apellidos"/>
   

    <TextInput style={styles.input}
      onChangeText={text => setForm({...form, birthDate: text})}
      placeholder="  Fecha de nacimiento"/>

    <TextInput style={styles.notas}
      onChangeText={text => setForm({...form, notes: text})}
      placeholder="  Notas"/>

    <Pressable  style={styles.buttonR} onPress={handleCreatePatient}>
      <Text  style={styles.textR}>
        Registrar
        
        </Text>
     </Pressable>

      </View>


      <View style={styles.menu}>

    <Menu/>
    </View>

    </View>
  );
}

export default PacienteRegistro;




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

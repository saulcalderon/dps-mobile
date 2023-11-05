import * as React from 'react';
import { View, Alert,TextInput, Text, StyleSheet, Pressable   } from 'react-native';

import LogoExample from '../components/Logo.js';

function RegistroUsuario({ navigation }) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    specialization: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.specialization ||
      !formData.email ||
      !formData.password
    ) {
      Alert.alert("Por favor llene todos los campos");
      return;
    }

    fetch(process.env.API_URL + "/users/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.status === 201 ? response : Promise.reject(response))
      .then((data) => {
        Alert.alert("Registro exitoso", "Inicie sesión para continuar", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
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
          Alert.alert("Error", "El correo ya está registrado");
          return;
        }

        Alert.alert("Error", "Ocurrió un error al registrar el usuario");
      });
  };
    

  return (
    <View style={styles.container} >

    <View style={styles.view}> 
    <LogoExample/> 
    </View>


    <Text style={styles.title}> 
    Registrarse 
    </Text>

    <View style={styles.card}>

      <TextInput style={styles.input}
      onChangeText={text => setFormData({...formData, firstName: text})}
      placeholder="  Nombre"/>

     <TextInput style={styles.input}
      onChangeText={text => setFormData({...formData, lastName: text})}
      placeholder="  Apellidos"/>
   

    <TextInput style={styles.input}
      onChangeText={text => setFormData({...formData, specialization: text})}
      placeholder="  Especialidad"/>

    <TextInput style={styles.input}
      onChangeText={text => setFormData({...formData, email: text})}
      placeholder="  Correo"/>

    <TextInput secureTextEntry={true} style={styles.input}
      onChangeText={text => setFormData({...formData, password: text})}
      placeholder="  Contraseña"/>


    <Pressable  style={styles.button} onPress={handleSubmit}>
      <Text  style={styles.text}>
        Registrarse
        
        </Text>
    </Pressable>

    <Text style={styles.title}>    
    O 
    </Text>

    <Pressable style={styles.button} onPress={() => Alert.alert('Simple Button pressed')}>
      <Text style={styles.text}>
        Registrarse con Gmail
        </Text>
    </Pressable>
      </View>

    </View>
  );
}

export default RegistroUsuario;




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
    margin: 4
  },
  
  text: {
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
  }

});

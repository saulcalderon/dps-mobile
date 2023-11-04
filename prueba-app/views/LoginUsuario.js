import * as React from 'react';
import { View, Alert,TextInput, Text, StyleSheet, Pressable   } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase.js';

import LogoExample from '../components/Logo.js';

function LoginUsuario({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
      if (!email) {
        Alert.alert('Correo no puede estar vacío');
        return;
      }

      if (!password) {
        Alert.alert('Contraseña no puede estar vacía');
        return;
      }

      try {
        const response = await signInWithEmailAndPassword(auth,
          email,
          password
        );
        const token = await response.user.getIdToken();
        await AsyncStorage.setItem('userToken', token);
        navigation.navigate('Citas');
      } catch (e) {
        Alert.alert('Correo o contraseña incorrectos, intente de nuevo.');
        return;
      }
    };

    return (
      <View style={styles.container} >

      <View style={styles.view}> 
      <LogoExample/> 
      </View>

      <Text style={styles.title}> 
      Inicio de Sesión 
      </Text>

      <View style={styles.card}>

        <TextInput style={styles.input}
          placeholder="  Correo"
          onChangeText={text => setEmail(text)}
          />

        <TextInput secureTextEntry={true} style={styles.input}
          placeholder="  Contraseña"
          onChangeText={text => setPassword(text)}
          />

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>
            Iniciar Sesión
            </Text>
        </Pressable>

        <Text style={styles.title}> 
        O 
        </Text>


        <Pressable style={styles.button} onPress={() => Alert.alert('Simple Button pressed')}>
         <Text style={styles.text}>
          Iniciar sesión con Gmail
          </Text>
        </Pressable>

        </View>

    </View>

    );
  }


  export default LoginUsuario;

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
        margin: 5
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
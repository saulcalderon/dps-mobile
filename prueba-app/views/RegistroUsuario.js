import React, { useEffect } from 'react';
import { View, Alert, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

import LogoExample from '../components/Logo.js';

function RegistroUsuario() {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId: '703597223984-b7pagltgsni2vlljt3ft050a9v3pga4d.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const registerWithGmail = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken, user } = await GoogleSignin.signIn();

      
      await GoogleSignin.signOut();

     
      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');

    
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.view}>
        <LogoExample />
      </View>

      <Text style={styles.title}>
        Registrarse
      </Text>

      <View style={styles.card}>

        <TextInput style={styles.input}
          placeholder="  Nombre" />

        <TextInput style={styles.input}
          placeholder="  Apellidos" />

        <TextInput style={styles.input}
          placeholder="  Especialidad" />

        <TextInput style={styles.input}
          placeholder="  Correo" />

        <TextInput secureTextEntry={true} style={styles.input}
          placeholder="  Contraseña" />

        <Pressable style={styles.button} onPress={() => Alert.alert('Simple Button pressed')}>
          <Text style={styles.text}>
            Registrarse
          </Text>
        </Pressable>

        <Text style={styles.title}>
          O
        </Text>

        <Pressable style={styles.button} onPress={registerWithGmail}>
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

  container: {
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
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import LogoExample from '../components/Logo.js';
import Icon from 'react-native-vector-icons/FontAwesome'; 

function LoginUsuario() {
  const [initializing, setInitializing] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const initializeGoogleSignin = async () => {
      await GoogleSignin.configure({
        scopes: ['email'],
        webClientId: '703597223984-b7pagltgsni2vlljt3ft050a9v3pga4d.apps.googleusercontent.com',
        offlineAccess: true,
      });

      
      try {
        await GoogleSignin.signOut();
      } catch (error) {
        console.error('Error signing out:', error);
      }

      setInitializing(false);
    };

    initializeGoogleSignin();
  }, []);

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken, user } = await GoogleSignin.signIn();

      // Crear credenciales de google
      const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);

      //Iniciar sesión con Google
      const { additionalUserInfo, user: firebaseUser } = await auth().signInWithCredential(googleCredential);

      //Verificar si es un nuevo usuario
      if (additionalUserInfo?.isNewUser) {
       
      }

      setLoggedIn(true);
      //Redirijir a citas si el inicio de sesión es exitoso
      navigation.navigate('Crear-Cita');
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

  if (initializing) return null;

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <LogoExample />
      </View>

      <Text style={styles.title}>Inicio de Sesión</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="  Correo" />
        <TextInput secureTextEntry={true} style={styles.input} placeholder="  Contraseña" />

        <Pressable style={styles.button1} onPress={() => navigation.navigate('Crear-Cita')}>
          <Text style={styles.text}>Iniciar Sesión</Text>
        </Pressable>

        <Text style={styles.title}>O</Text>

        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={_signIn}>
              <Icon name="google" size={20} color="white" style={styles.icon} />
              <Text style={styles.text}>Iniciar Sesión con Google</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            {!loggedIn && <Text></Text>}
            {loggedIn && (
              <Pressable style={styles.button} onPress={() => navigation.navigate('Crear-Cita')}>
                <Text style={styles.text}>Iniciar Sesión</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default LoginUsuario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
  },

  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: 'red',
    margin: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 250,
    borderRadius: 6,
    elevation: 3,
    margin: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 10,
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
    margin: 20,
  },
  icon: {
    marginRight: 10,
  },
});

import React, { useEffect, useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function Menu() {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkGoogleSignInStatus = async () => {
      const isSignedIn = await GoogleSignin.isSignedIn();
      setIsLoggedIn(isSignedIn);
    };

    checkGoogleSignInStatus();
  }, []);

  const signOut = async () => {
    try {
      if (isLoggedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      // Cualquier otra lógica para cerrar sesión aquí

      setIsLoggedIn(false);
      navigation.navigate('Inicio');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.menu}>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Citas')}>
        <MaterialIcons name="schedule" size={24} color="black" />
        <Text style={styles.text}>Citas</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Pacientes')}>
        <Ionicons name="person-add-outline" size={24} color="black" />
        <Text style={styles.text}>Pacientes</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={signOut}>
        <MaterialIcons name="logout" size={24} color="black" />
        <Text style={styles.text}>Salir</Text>
      </Pressable>
    </View>
  );
}

export default Menu;

const styles = StyleSheet.create({
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderRadius: 6,
    backgroundColor: 'white',
    margin: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'red',
  },
});
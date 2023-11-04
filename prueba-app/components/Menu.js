import * as React from 'react';
import { View, Alert,TextInput, Text, StyleSheet, Pressable   } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 


function Menu() {
  const navigation = useNavigation();
    return (

        <View style={styles.menu}>

        <Pressable  style={styles.button} onPress={() => navigation.navigate('Citas')}>
        <MaterialIcons name="schedule" size={24} color="black" />
        <Text style={styles.text}>
            Citas
            </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Pacientes')}>
        <Ionicons name="person-add-outline" size={24} color="black" />
          <Text style={styles.text}>
            Pacientes
            </Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Inicio')}>
        <MaterialIcons name="logout" size={24} color="black" />
          <Text style={styles.text}>
            Salir
            </Text>
        </Pressable>
        </View>
    )
    ;}

    export default Menu;

    const styles = StyleSheet.create({menu: {
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
      }
    });
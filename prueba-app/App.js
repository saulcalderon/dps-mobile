import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

;
import Inicio from './views/InicioVista.js';
import LoginVista from './views/LoginVista.js';
import RegistroVista from './views/RegistroVista.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container} >
      
      <NavigationContainer style={styles.container} >
        
        <Stack.Navigator headerMode = 'none'>
          
          <Stack.Screen name = 'Inicio' component={Inicio}/>
          <Stack.Screen name = 'Login' component={LoginVista} />
          <Stack.Screen name = 'Registro' component={RegistroVista} />

        </Stack.Navigator>

      </NavigationContainer>

    </SafeAreaView>
  );
}

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
  }
  
});

import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './views/InicioVista.js';
import LoginUsuario from './views/LoginUsuario.js';
import CitasVista from './views/CitasVista.js';
import CrearCita from './views/CrearCita.js';
import PacientesVista from './views/PacientesVista.js';
import PacienteRegistro from './views/PacienteRegistro.js';
import RegistroUsuario from './views/RegistroUsuario.js';
import AppointmentDetail from './views/DetalleCita.js';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container} >
      
      <NavigationContainer style={styles.container} >
        
        <Stack.Navigator headerMode = 'none'>
          
          <Stack.Screen name = 'Inicio' component={Inicio}/>
          <Stack.Screen name = 'Login' component={LoginUsuario} />
          <Stack.Screen name = 'Registro' component={RegistroUsuario} />
          <Stack.Screen name = 'Citas' component={CitasVista}/>
          <Stack.Screen name = 'Crear-Cita' component={CrearCita}/>
          <Stack.Screen name = 'Pacientes' component={PacientesVista}/>
          <Stack.Screen name = 'Crear-Paciente' component={PacienteRegistro}/>
          <Stack.Screen name = 'Detalle-Cita' component={AppointmentDetail}/>


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

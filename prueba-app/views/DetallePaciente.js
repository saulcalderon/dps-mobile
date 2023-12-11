import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogoExample from '../components/Logo.js';

function PatientDetail({ route }) {
    const { patient } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <LogoExample />
            </View>
            <Text style={styles.title}>Detalle del paciente</Text>

            <Text style={styles.detail}>Nombre: {patient.firstName}</Text>
            <Text style={styles.detail}>Apellido: {patient.lastName}</Text>
            <Text style={styles.detail}>Fecha de nacimiento: {patient.birthDate}</Text>
            <Text style={styles.detail}>Notas: {patient.notes}</Text>
        </View>
    );
}

export default PatientDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    detail: {
        fontSize: 18,
        marginBottom: 10,
    },
});
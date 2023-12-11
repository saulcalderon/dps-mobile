import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogoExample from '../components/Logo.js';
import { formatDate } from '../common/date-utils.js';

function AppointmentDetail({ route }) {
    const { appointment } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <LogoExample />
            </View>
            <Text style={styles.title}>Detalle de la Cita</Text>

            <Text style={styles.detail}>Fecha: {formatDate(appointment.date)}</Text>
            <Text style={styles.detail}>Hora: {appointment.time}</Text>
            <Text style={styles.detail}>Nombre paciente: {appointment.patientName}</Text>
            <Text style={styles.detail}>Doctor: {appointment.doctorName}</Text>
            <Text style={styles.detail}>Motivo: {appointment.reason}</Text>
            <Text style={styles.detail}>Notas: {appointment.notes}</Text>
        </View>
    );
}

export default AppointmentDetail;

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
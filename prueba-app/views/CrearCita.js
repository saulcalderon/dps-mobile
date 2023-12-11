import * as React from 'react';
import { View, Alert, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';


import LogoExample from '../components/Logo.js';
import Menu from '../components/Menu.js';

function CrearCita() {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [valueDropdown, setValueDropdown] = React.useState(null);
  const [itemsDropdown, setItemsDropdown] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState(null);
  const [motivo, setMotivo] = React.useState('');
  const [notas, setNotas] = React.useState('');

  const [date, setDate] = React.useState(undefined);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpenDatePicker(false);
  }, [setOpenDatePicker]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpenDatePicker(false);
      setDate(params.date);
    },
    [setOpenDatePicker, setDate]
  );

  const [visibleTimePicker, setVisibleTimePicker] = React.useState(false);
  const [time, setTime] = React.useState(undefined);
  const onDismiss = React.useCallback(() => {
    setVisibleTimePicker(false)
  }, [setVisibleTimePicker])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisibleTimePicker(false);
      setTime(`${hours}:${minutes}`);
    },
    [setVisibleTimePicker]
  );


  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    setToken(token);

    fetch(process.env.API_URL + "/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        const options = data.map(item => ({
          label: item.firstName + ' ' + item.lastName,
          value: item.id, // customize based on your data
        }));
        setItemsDropdown(options);
      })
      .catch(error => console.error(error));
  };

  React.useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const validateInput = () => {
    return !!valueDropdown && date && time && motivo && notas;
  };

  return (
    <View style={styles.container} >

      <View style={styles.view}>
        <LogoExample />
      </View>


      <Text style={styles.title}>
        Crear Cita
      </Text>

      <View style={styles.card}>


        {itemsDropdown.length > 0 && (
          <DropdownPicker
            open={openDropdown}
            value={valueDropdown}
            items={itemsDropdown}
            setOpen={setOpenDropdown}
            setValue={setValueDropdown}
            onChangeValue={(value) => {
              setValueDropdown(value);
            }}
            setItems={setItemsDropdown}
            placeholder="Seleccione un paciente"
          />
        )}

        <Button onPress={() => setOpenDatePicker(true)} uppercase={false} mode="outlined" style={{ marginTop: 10, marginBottom: 10 }}>
          Seleccione una fecha
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={openDatePicker}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />

        {date && <TextInput style={{ marginTop: 30, marginBottom: 30, ...styles.input }}
          placeholder="  Fecha "
          value={date.toDateString()}
          editable={false}
        />}

        <Button onPress={() => setVisibleTimePicker(true)} uppercase={false} mode="outlined">
          Seleccione una hora
        </Button>
        <TimePickerModal
          visible={visibleTimePicker}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />

        {
          time && (
            <TextInput style={{ marginTop: 30, marginBottom: 30, ...styles.input }}
              placeholder="  Hora "
              value={time}
              editable={false}
            />
          )
        }

        <TextInput
          style={styles.input}
          placeholder="  Motivo "
          onChangeText={setMotivo}
        />

        <TextInput
          style={styles.notas}
          placeholder="  Notas"
          onChangeText={setNotas}
        />

        <Pressable style={styles.buttonR}
          onPress={() => {
            if (validateInput()) {
              console.log(valueDropdown, date, time, motivo, notas);
              fetch(`${process.env.API_URL}/appointments`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                  patientId: valueDropdown,
                  date,
                  time,
                  reason: motivo,
                  notes: notas,
                }),
              })
                .then(response => {
                  console.log(response);
                  Alert.alert('Cita creada con éxito!');
                })
                .catch(error => {
                  console.error(error);
                  Alert.alert('Error al crear la cita.');
                });
            } else {
              Alert.alert('Por favor, seleccione todos los campos requeridos.');
            }
          }}>
          <Text style={styles.textR}>
            Agendar

          </Text>
        </Pressable>

      </View>


      <View style={styles.menu}>

        <Menu />
      </View>

    </View>
  );
}

export default CrearCita;




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
    flex: 8,
    backgroundColor: '#fff'
  },

  menu: {
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
  },


  textR: {
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
    margin: 5
  },

  dropdown: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
    borderRadius: 6,
    height: 40,
    width: 200,
    borderWidth: 2,
    borderColor: 'black',
    margin: 5
  },

  notas: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
    borderRadius: 6,
    height: 100,
    width: 200,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20
  },

  buttonR: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: 'red',
    margin: 4
  },
});

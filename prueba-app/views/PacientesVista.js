import * as React from "react";
import {
  View,
  Alert,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LogoExample from "../components/Logo.js";
import Menu from "../components/Menu.js";
import BotonCrearPaciente from "../components/BotonCrearPaciente.js";

function Card({ text, onPress }) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardText}>{text}</Text>
      <Pressable
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Ver</Text>
      </Pressable>
    </View>
  );
}

function PacientesVista({ navigation }) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      fetchData();
    });
  }, [navigation]);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    fetch(process.env.API_URL + "/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })

      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <LogoExample />
      </View>

      <Text style={styles.title}>Pacientes</Text>

      <View style={styles.card}>
        {data?.map((item) => (
          <Card key={item.id} text={item.firstName + " " + item.lastName}
            onPress={() => navigation.navigate('Detalle-Paciente', { patient: item })}
          />

        ))}
      </View>

      <View style={styles.menu}>
        <BotonCrearPaciente
        />
      </View>

      <View style={styles.menu}>
        <Menu />
      </View>
    </View>
  );
}

export default PacientesVista;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  view: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    color: "red",
    margin: 15,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  card: {
    alignItems: "center",
    justifyContent: "top",
    flex: 8,
    backgroundColor: "#fff",
  },

  menu: {
    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
    backgroundColor: "#fff",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 100,
    borderRadius: 6,
    backgroundColor: "white",
    margin: 2,
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "red",
  },

  textR: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  input: {
    textAlign: "center",
    fontWeight: "bold",
    color: "grey",
    borderRadius: 6,
    height: 40,
    width: 200,
    borderWidth: 2,
    borderColor: "black",
    margin: 20,
  },

  notas: {
    textAlign: "center",
    fontWeight: "bold",
    color: "grey",
    borderRadius: 6,
    height: 100,
    width: 200,
    borderWidth: 2,
    borderColor: "black",
    margin: 20,
  },

  buttonR: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 200,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "red",
    margin: 4,
  },

  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
  },

  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 100,
    borderRadius: 6,
    backgroundColor: "red",
    marginLeft: 60,
  },

  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

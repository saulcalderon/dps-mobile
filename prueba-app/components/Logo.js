import { Text, View, StyleSheet, Image } from 'react-native';

export default function LogoExample() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/Logo_UDB.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:1,
  },
  logo: {

    alignItems: 'center',
    height: 50,
    width: 100,
  }
});

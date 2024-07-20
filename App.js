import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CommunicationController from './src/components/ComunicationController'; // Assicurati che il percorso sia corretto


export default function App() {
  return (
    <View style={styles.container}>
      <Text>ollela!</Text>
      <CommunicationController />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

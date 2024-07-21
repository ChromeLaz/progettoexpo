import React from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.userContainer}> 

      <Text>Nome Utente</Text>
    <View style={styles.buttonProfileContainer}>
      {/*<Button title="Profilo" onPress={goToProfile} />*/}
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 5,
  },
});

export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserComponent = () => {
  return (
    <View style={styles.userContainer}>
      <Text>Nome Utente</Text>
      {/* Aggiungi qui ulteriori dettagli sull'utente */}
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 5,
  },
});

export default UserComponent;
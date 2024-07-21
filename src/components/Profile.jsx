import React from 'react';
import { View, Text,Button, StyleSheet } from 'react-native';

const Profile = ({ goToHome }) => {
  return (
    <View style={styles.userContainer}> 

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

export default Profile;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text,Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/HomeScreen';
import Profile from './src/components/Profile';
import Ranking from './src/components/Ranking';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Ranking')}
                title="Ranking"
              />
            ),
            headerLeft: () => (
              <Button
                onPress={() => navigation.navigate('Profile')}
                title="Profile"
              />
            ),
          })}
        />
        <Stack.Screen name="Ranking" component={Ranking} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

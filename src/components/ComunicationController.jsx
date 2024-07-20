import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://develop.ewlab.di.unimi.it/mc/mostri';

// pesco uid e sid da AsyncStorage
export const getStoredRegisterData = async () => {
    try {
        const value = await AsyncStorage.getItem('registerData');
        if (value === null) {
            console.log('No data in AsyncStorage for key "registerData"');
            const registerResponse = await register();
            return registerResponse;
        }
        return JSON.parse(value);
    } catch (e) {
        console.error('Failed to get data from AsyncStorage', e);
        return null;
    }
};


// chiamate al server

export const register = async () => {
    let response;
    try {
        response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        console.log('data from register', data);
        await AsyncStorage.setItem('registerData', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Failed to register', error, response && response.status);
    }
};

export const getRankings = async () => {
    try {
        const data = await getStoredRegisterData();
        console.log('data from getRankings, nostro utente: ', data.uid);
        const sid = data !== null ? data.sid : null;
        console.log('sid from getRankings: ', sid);
        const response = await fetch(`${BASE_URL}/ranking?sid=${sid}`);
        const rankings = await response.json();
        //console.log('rankings from getRankings', rankings);
        return rankings;
    } catch (error) {
        console.error('Failed to get rankings', error);
    }
};

export const getUserDetail = async (uid) => {
    try {
        const data = await getStoredRegisterData();
        const sid = data !== null ? data.sid : null;
        const response = await fetch(`${BASE_URL}/users/${uid}?sid=${sid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userDetail = await response.json();
        return userDetail;
    } catch (error) {
        console.error('Failed to fetch user detail', error);
        throw error;
    }
};

// basta uno dei tre
export const updateUserDetail = async (name, picture, positionshare) => {
    console.log('updateUserDetail', name, picture, positionshare);
    try {
        const data = await getStoredRegisterData();
        const uid = data !== null ? data.uid : null;
        const sid = data !== null ? data.sid : null;
        const response = await fetch(`${BASE_URL}/users/${uid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sid: sid,
                name: name,
                picture: picture,
                positionshare: positionshare,
            }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userDetail = await response.json();
        return userDetail;
    } catch (error) {
        console.error('Failed to update user detail' + error);
        throw error;
    }
};


export const getNearUsers = async (coords) => {
    try {
        const data = await getStoredRegisterData();
        const sid = data !== null ? data.sid : null;
        const response = await fetch(`${BASE_URL}/users?sid=${sid}&lat=${coords.latitude}&lon=${coords.longitude}`);
        const nearUsers = await response.json();
        return nearUsers;
    } catch (error) {
        console.error('Failed to get near users', error);
        // return [];
    }
};

// oggetti

export const getNearObjects = async (coords) => {
    try {
        const data = await getStoredRegisterData();
        const sid = data !== null ? data.sid : null;
        const response = await fetch(`${BASE_URL}/objects?sid=${sid}&lat=${coords.latitude}&lon=${coords.longitude}`);
        const nearObjects = await response.json();
        //console.log('nearObjects from getNearObjects', nearObjects);
        console.log('nearObjects from getNearObjects, ok');
        return nearObjects;
    } catch (error) {
        console.error('Failed to get near objects', error);
    }
};


export const getObjectDetail = async (uid) => {
    try {
        const data = await getStoredRegisterData();
        const sid = data !== null ? data.sid : null;
        const response = await fetch(`${BASE_URL}/objects/${uid}?sid=${sid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const objectDetail = await response.json();
        // console.log('objectDetail from getObjectDetail', objectDetail);
        return objectDetail;
    } catch (error) {
        console.error('Failed to fetch object detail', error);
        throw error;
    }
}

// ritorna: died. life, experience, weapon, armor, amulet.
export const activateObject = async (id) => {
    try {
        const data = await getStoredRegisterData();
        const sid = data !== null ? data.sid : null;
        const response = await fetch(`${BASE_URL}/objects/${id}/activate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sid: sid })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to activate object', error);
        throw error;
    }
}





const ComunicationController = () => {
  const [ranking, setRanking] = useState(null);

  useEffect(() => {
    getRankings().then((rankings) => {
      setRanking(rankings);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Ranking:</Text>
      {/* Renderizza qui il ranking o un messaggio di attesa/caricamento */}
      {/* {ranking ? <Text>{JSON.stringify(ranking)}</Text> : <Text>Caricamento ranking...</Text>} */}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ComunicationController;
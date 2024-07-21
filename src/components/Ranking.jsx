import React, { useState, useEffect } from 'react';
import { View,Button, Text, StyleSheet, FlatList } from 'react-native';
import { getRankings } from './ComunicationController';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const Ranking = ({ goToHome }) => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const rankings = await getRankings();
        setRanking(rankings);
      } catch (error) {
        console.error("Errore nel caricamento del ranking:", error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Ranking:</Text>
      {ranking.length > 0 ? (
        <FlatList
          data={ranking}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text>Nome: {item.uid}</Text>
              <Text>Punteggio: {item.experience}</Text>
              {/* Aggiungi qui altre proprietà che vuoi visualizzare */}
            </View>
          )}
        />
      ) : (
        <Text>Caricamento ranking...</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Modifica qui per allineare gli elementi all'inizio
    marginTop: 20, // Spazio in alto per il bottone
  },
  listItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#add8e6', // Sfondo azzurro chiaro
    borderRadius: 5,
    flexDirection: 'row', // Elementi della lista su una sola riga
    justifyContent: 'space-between', // Distribuisce lo spazio uniformemente
  },

});

export default Ranking;
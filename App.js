// App.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import TaskManager from './TaskManager';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Task Manager</Text>
        <TaskManager />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex: 1,
    width: '100%',
    backgroundColor: '#ff0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

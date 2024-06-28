import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import Task from './Task';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim() === '') return;

    console.log(newTaskTitle)

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const toggleStatus = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: !task.status } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
        <View style={styles.buttonContainer}>
        <Button
          title="Add Task"
          onPress={addTask}
          disabled={newTaskTitle.trim() === ''}
        />
      </View>
      
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Task
            task={item}
            toggleStatus={toggleStatus}
            deleteTask={deleteTask}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width:'100%',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',

  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default TaskManager;

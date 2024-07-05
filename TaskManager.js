import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Button, } from 'react-native';
import Task from './Task';
import { collection, getDocs, query, getFirestore, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from './Firebase';

const TaskManager = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const dbCollection = collection(db, 'Tasks');
    const dbQuery = query(dbCollection);

    getDocs(dbQuery)
      .then((querySnapshot) => {
        const fetchedTasks = [];
        querySnapshot.forEach((doc) => {

          const data = doc.data();
          fetchedTasks.push({ id: doc.id, title: data.title, completed: data.completed });
        });
        setTasks(fetchedTasks);
      })
      .catch((error) => {

      });
  }, []);


  const addTask = async () => {
    if (newTaskTitle.trim() === '') return;

    const newTask = {
      title: newTaskTitle,
      completed: false,
    };

    try {
      const docRef = await addDoc(collection(db, 'Tasks'), newTask);
      setTasks([...tasks, { ...newTask, id: docRef.id }]);
      setNewTaskTitle('');
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const toggleStatus = async (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return;

    try {
      const taskRef = doc(db, 'Tasks', taskId);
      await updateDoc(taskRef, { completed: !task.completed });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'Tasks', taskId));
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
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

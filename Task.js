import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Checkbox, IconButton } from 'react-native-paper';

const Task = ({ task, toggleStatus, deleteTask }) => {
  

  return (
    <View style={styles.taskContainer}>
              <Text style={ (task.status==false) ? styles.taskTitle : styles.taskTitleDone}>{task.title}</Text>
     <View  style={{flexDirection:'row',alignItems:'center'}}>
     <Checkbox
        status={task.status ? 'checked' : 'unchecked'}
        onPress={() => toggleStatus(task.id)}
      />
      <IconButton
        icon="delete"
        onPress={() => deleteTask(task.id)}
      />
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'column',
    alignItems: 'start',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    flex: 1,
    fontSize: 18,
    color:'red'
  },

  taskTitleDone: {
    flex: 1,
    fontSize: 18,
    color:'green'
  },
});

export default Task;

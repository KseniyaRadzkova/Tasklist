import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValesType = 'active' | 'completed' | 'all'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValesType>('all')


    const removeTask = (taskId: string) => {
        let filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    const addTask = (taskTitle: string) => {
        let newTask = {id: v1(), title: taskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    let changeFilter = (value: FilterValesType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasksForTodolist}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;

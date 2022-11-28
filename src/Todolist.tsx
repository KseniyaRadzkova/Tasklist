import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValesType} from "./App";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    addTask: (taskTitle: string) => void
    changeFilter: (value: FilterValesType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [taskTitle, setTaskTitle] = useState<string>("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const addTask = () => {
        props.addTask(taskTitle)
        setTaskTitle("")

    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={handleChange} onKeyPress={handleKeyPress}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => {
                        props.removeTask(task.id)
                    }
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>✖</button>
                        </li>
                    )

                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
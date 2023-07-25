import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Input} from "./components/Input";
import {Button} from "./components/Button";

export type TodosType = {
	id: number,
	userId: number,
	title: string,
	completed: boolean,
}


function App() {

	const [todos, setTodos] = useState<TodosType[]>([]);
	// const [newTitle, setNewTitle] = useState<string>('');

	const newTitle = useRef<HTMLInputElement>(null)

	// Создали функцию fetchFunc чтобы не дублировать код
	const fetchFunc = () => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then(response => response.json())
			.then(json => setTodos(json))
	}

	useEffect(() => {
		// fetch('https://jsonplaceholder.typicode.com/todos')
		// 	.then(response => response.json())
		// 	.then(json => setTodos(json))
		fetchFunc()
	}, [])

	const onClickHandler = () => {
		// fetch('https://jsonplaceholder.typicode.com/todos')
		// 	.then(response => response.json())
		// 	.then(json => setTodos(json))
		fetchFunc()
	}

	const onClickDeleteHandler = () => {
		setTodos([])
	}

	// useRef()

	const addTodo1 = () => {
		if (newTitle.current) {
			const newTodo = {
				userId: 1,
				id: todos.length + 1,
				title: newTitle.current.value,
				completed: false,
			}
			setTodos([newTodo, ...todos])
			newTitle.current.value='';
			newTitle.current.focus();
		}
	}

	// 1-й способ добавления
	// const addTodo1 = () => {
	// 	const newTodo = {
	// 		userId: 1,
	// 		id: todos.length + 1,
	// 		title: newTitle,
	// 		completed: false,
	// 	}
	// 	setTodos([newTodo, ...todos])
	// 	setNewTitle('')
	// }


	// 2-й способ добавления
	// const addTodo = (title: string) => {
	// 	const newTodo = {
	// 		userId: 1,
	// 		id: todos.length + 1,
	// 		title: title,
	// 		completed: false,
	// 	}
	// 	setTodos([newTodo, ...todos])
	// }
	// // 2-й способ добавления
	// const addCallBackButton = () => {
	// 	addTodo(newTitle)
	// 	setNewTitle('')
	// 	// alert(`заголовок: ${newTitle}`)
	// }


	return (

		<div className="App">
			<div className="Button">
				<div>
					<Button name={"SHOW TODOS"} callBack={onClickHandler}/>
					<Button name={"DELETE TODOS"} callBack={onClickDeleteHandler}/>
				</div>
				<button onClick={onClickHandler}>Show Todos</button>
				<button onClick={onClickDeleteHandler}>Delete Todos</button>
				<div>
					<Input newTitle={newTitle}/>
					{/*<Input setNewTitle={setNewTitle} newTitle={newTitle}/>*/}
					{/*<Button name={'ADD'} callBack={addCallBackButton}/>*/}
					<Button name={'ADD1'} callBack={addTodo1}/>
				</div>
			</div>
			<ul>
				{todos.map((el) => {
					return (
						<li key={el.id}>
							<input type="checkbox" checked={el.completed}/>
							<span> {el.id} </span>
							<span>{el.title} </span>
						</li>
					)
				})}
			</ul>
		</div>
	);
}

export default App;

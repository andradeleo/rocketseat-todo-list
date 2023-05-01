import Logo from "./components/Logo";
import EmptyTask from "./assets/emptyTask.svg";

import styles from "./App.module.css";

import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Task from "./components/Task";

interface Tasks {
	id: string;
	content: string;
	isCompleted: boolean;
}

export default function App() {
	const [content, setContent] = useState("");
	const [tasks, setTasks] = useState<Tasks[]>([]);

	function handleNewTaskTextChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity("");
		setContent(e.target.value);
	}

	function handleNewTaskTextInvalid(e : InvalidEvent<HTMLInputElement>) {
    e.target.setCustomValidity("Esse campo é obrigatório");
  }

	function handleAddNewTask(e: FormEvent) {
		e.preventDefault();
		const id: string = uuidv4();
		setTasks([...tasks, { id, content, isCompleted: false }]);
		setContent("");
	}

	function handleRemoveTask(id: string) {
		const taskWithOutTaskDeleted = tasks.filter((task) => {
			return task.id != id;
		});

		setTasks(taskWithOutTaskDeleted);
	}

	function handleCompletedTask(id: string) {
		setTasks(tasks.map((task) => {
			if (task.id === id) {
				return { ...task, isCompleted: true };
			}
			return task;
		}));
	}

	const numberOfTasksCompleted = tasks.reduce((acc, task) => {
		if (task.isCompleted) {
			return acc + 1;
		}
		return acc;
	}, 0);

	return (
		<>
			<header className={styles.header}>
				<Logo />

				<div className={styles.form}>
					<form className={styles.formContainer} onSubmit={handleAddNewTask}>
						<input
							type="text"
							placeholder="Adicione uma nova tarefa"
							value={content}
							onInvalid={handleNewTaskTextInvalid}
							onChange={handleNewTaskTextChange}
							required
						/>
						<button type="submit">
							<span>Criar</span>
							<PlusCircle size={16} />
						</button>
					</form>
				</div>
			</header>

			<main className={styles.main}>
				<div className={styles.taskCount}>
					<div>
						<span>Tarefas criadas</span>
						<div className={styles.countContainer}>
							<span>{tasks.length}</span>
						</div>
					</div>
					<div>
						<span className={styles.doneTasks}>Concluídas</span>
						<div className={styles.countContainer}>
							<span>
								{ tasks.length > 0 ? `${numberOfTasksCompleted} de ${tasks.length}` : 0 }
							</span>
						</div>
					</div>
				</div>

				{tasks.map((task) => (
					<Task
						key={task.id}
						task={task}
						onRemove={handleRemoveTask}
						onComplete={handleCompletedTask}
					/>
				))}

				{tasks.length == 0 ? (
					<div className={styles.emptyTask}>
						<img src={EmptyTask} alt="Empty task" />
						<p>
							<strong>Você ainda não tem tarefas cadastradas</strong>
						</p>
						<p>Crie tarefas e organize seus itens a fazer</p>
					</div>
				) : null}
			</main>
		</>
	);
}

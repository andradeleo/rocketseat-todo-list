import { Trash } from "phosphor-react";
import styles from "./Task.module.css";

interface Tasks {
	id: string;
	content: string;
	isCompleted: boolean
}

interface TaskProps {
	task: Tasks;
	onRemove: (id: string) => void
	onComplete: (id: string) => void
}

export default function Task({ task, onRemove, onComplete }: TaskProps) {
	return (
		<div className={task.isCompleted ? styles.taskCompleted : styles.task}>
			<input
				type="checkbox"
				onClick={() => onComplete(task.id)}
				className={styles.checkBoxInput}
				disabled={task.isCompleted}
			/>
			<div className={styles.textContainer}>
				<p>{task.content}</p>
			</div>
			<Trash size={16} onClick={() => onRemove(task.id)}/>
		</div>
	);
}

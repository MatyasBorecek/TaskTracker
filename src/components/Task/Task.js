import { FaTimes } from 'react-icons/fa';
import './Task.css';

const Task = ({task, deleteTask, changeReminderState}) => {
    return (
        <div
            className={`task ${task.reminder && 'reminder'}`}
            onDoubleClick={() => changeReminderState(task.id)}
        >
            <h3>
                {task.name}{' '}
                <FaTimes
                    style={{color: 'red', cursor: 'pointer'}}
                    onClick={() => deleteTask(task.id)}
                />
            </h3>
        </div>
    )
}

export default Task
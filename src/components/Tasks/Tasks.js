import Task                    from "../Task/Task";
import { useEffect, useState } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
            const getTasks = async () => {
                const tasksFromServer = await fetchTasks();
                setTasks(tasksFromServer);
            }

            getTasks().catch(err => {
                if (err) {
                    throw err;
                }
            });
        }, []
    );

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        return await res.json();
    };

    const fetchSingleTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        return await res.json();
    };

    const deleteTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'});
        res.status === 200 ?
            setTasks(tasks.filter((task) => (task.id !== id))) :
            alert('Error Deleting This Task')
    };

    const changeReminderState = async (id) => {
        const taskToToggle = await fetchSingleTask(id);
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder};

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updTask),
        });
        const data = await res.json();

        setTasks(
            tasks.map(
                task =>
                    task.id === id ?
                        {...task, reminder: data.reminder} :
                        task
            )
        );
    }

    return (
        <ul>
            {
                tasks.map((task) => {
                    return <Task task={task} deleteTask={deleteTask} changeReminderState={changeReminderState}/>
                })
            }
        </ul>
    );
}

export default Tasks;
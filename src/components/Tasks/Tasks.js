import Task                    from "../Task/Task";
import { useEffect, useState } from "react";
import ApiTaskHelper           from "../../helper/ApiHelper/ApiHelper";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const apiHelper = new ApiTaskHelper();

    useEffect(() => {
            const getTasks = async () => {
                const tasksFromServer = await apiHelper.fetchTasks();
                setTasks(tasksFromServer);
            }

            getTasks().catch(err => {
                if (err) {
                    throw err;
                }
            });
        }, []
    );

    const deleteTask = async (id) => {
        const res = await apiHelper.deleteTask(id);
        res.status === 200 ?
            setTasks(tasks.filter((task) => (task.id !== id))) :
            alert('Error Deleting This Task')
    };

    const changeReminderState = async (id) => {
        const res = await apiHelper.changeReminder(id);
        setTasks(
            tasks.map(
                task =>
                    task.id === id ?
                        {...task, reminder: res.reminder} :
                        task
            )
        );
    };

    return (
        <ul>
            {
                tasks.map((task) => {
                    return <Task task={task} deleteTask={deleteTask} changeReminderState={changeReminderState}/>
                })
            }
        </ul>
    );
};

export default Tasks;
import Task                    from "../Task/Task";
import AddForm                 from "../App/AddForm/AddForm";
import { useEffect, useState } from "react";
import ApiTaskHelper           from "../../helper/ApiHelper/ApiHelper";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const apiHelper = new ApiTaskHelper();

    useEffect(() => {
            const getTasks = async () => {
                const tasksFromServer = await apiHelper.fetchTasks();
                await setTasks(tasksFromServer);
            }

            getTasks();
        }, []
    );

    const deleteTask = async (id) => {
        //NOTE: Dunno why @var res is blank object
        const res = await apiHelper.deleteTask(id);
        setTasks(tasks.filter((task) => (task.id !== id)));
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
        <>
            <AddForm taskLoadAfterSave={setTasks}/>
            <ul>
                {
                    tasks.map((task, index) => {
                        return <Task key={index}
                                     task={task}
                                     deleteTask={deleteTask}
                                     changeReminderState={changeReminderState}
                        />
                    })
                }
            </ul>
        </>
    );
};

export default Tasks;
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
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        return await res.json();
    };

    return (
        <>
            <ul>
                {
                    tasks.map((task) => {
                        return <>
                            <li>{task.id}</li>
                            <li>{task.name}</li>
                        </>
                    })
                }
            </ul>
        </>
    );
}

export default Tasks;
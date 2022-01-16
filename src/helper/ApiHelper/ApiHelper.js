class ApiTaskHelper {
    #testingApiUri = 'http://localhost:5000/tasks';

    async fetchTasks() {
        const res = await fetch(this.#testingApiUri);
        return await res.json();
    };

    async fetchSingleTask(taskId) {
        const res = await fetch(this.#testingApiUri.concat(`/${taskId}`));
        return await res.json();
    };

    async deleteTask(taskId) {
        const res = await fetch(this.#testingApiUri.concat(`/${taskId}`), {method: 'DELETE'});
        return await res.json();
    };

    async changeReminder(taskId) {
        const taskToToggle = await this.fetchSingleTask(taskId);
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};

        const res = await fetch(this.#testingApiUri.concat(`/${taskId}`),
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            }
        );
        return await res.json();
    };

    async addNewTask(newTask) {
        const res = await fetch(this.#testingApiUri,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
        console.log(await (res.json()));
        return await res.json();
    };
}

export default ApiTaskHelper;
import { useState }  from "react";
import ApiTaskHelper from "../../../helper/ApiHelper/ApiHelper";
import './AddForm.css';

const AddForm = ({performCallForNewTask}) => {
    const [name, setName] = useState('');
    const [reminder, setReminder] = useState(false);

    const apiHelper = new ApiTaskHelper();


    const initStates = () => {
        setName('');
        setReminder(false);
    };

    const addNewTask = async (e) => {
        e.preventDefault();
        if (!name) {
            //TODO: Add custom user fault exception.
            alert('Please specify task name.');
        }
        await apiHelper.addNewTask({name: name, reminder: reminder});

        initStates();
    };

    return (
        <form className='add-form' onSubmit={addNewTask}>
            <div className='form-control'>
                <label>Task Name</label>
                <input
                    type='text'
                    placeholder='Add Task'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input
                    type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>

            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    );
};

export default AddForm;
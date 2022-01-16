import Header  from "../Header/Header";
import Tasks   from "../Tasks/Tasks";
import AddForm from "./AddForm/AddForm";
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Header/>
            <AddForm/>
            <Tasks/>
        </div>
    );
};

export default App;
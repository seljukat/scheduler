import React from 'react';
import './styles/App.css';
import QueryContextProvider from './contexts/QueryContext';
import SchedulerGrid from './components/SchedulerGrid';
import AddLecture from './components/AddLecture';

function App() {
    return (
        <div className="App">
            <div className="main-grid-container">
                <QueryContextProvider>
                    <SchedulerGrid />
                    <AddLecture />
                </QueryContextProvider>
            </div>
        </div>
    );
}

export default App;

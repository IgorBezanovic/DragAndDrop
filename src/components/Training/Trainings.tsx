import React from 'react';

const Trainings: React.FC = () => {
    const list = [{id: 't1', text: 'Finish the course'}, {id: 't2', text: 'Start the new course'}]
    console.log('evo ga')
    return (
        <ul>
            {list.map(item => <li key={item.id}>{item.text}</li>)}
        </ul>
    );
}

export default Trainings;
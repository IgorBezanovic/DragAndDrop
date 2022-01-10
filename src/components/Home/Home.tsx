import React, { useState } from 'react';
import { listTrainings } from '../../service/listTrainings'
import { Training } from '../../models/training.model'
import './style.css'

const Home: React.FC = () => {
    const name :string | null = localStorage.getItem('name');
    const role :string | null = localStorage.getItem('role');
    const [listMembers, setMembers] = useState<Training[]>(listTrainings)

    const removeMember = (id: number, trainingId: number) => {
        let foundIndex: number = listTrainings.findIndex((item) => item.id === trainingId);

        let newList: Training[] = [...listTrainings];

        newList[foundIndex].freeSpace = ++newList[foundIndex].freeSpace;
        newList[foundIndex].members = newList[foundIndex].members.filter(member => member.id !== id)
        
        console.log(id)
        setMembers(newList)
        console.log(newList)
    }
    const addMember = (id: number) => {
        let foundIndex: number = listTrainings.findIndex((item) => item.id === id);
        let newList: Training[] = [...listTrainings];
        newList[foundIndex].freeSpace = --newList[foundIndex].freeSpace;
        newList[foundIndex].members.push({
          id: newList[foundIndex].members.length + 1,
          name: window.prompt('Unesite ime klijenta?'),
          lastName: window.prompt('Unesite prezime klijenta?'),
        });
        setMembers(newList)
        console.log(newList)

    }

    const renderContent = () => {
        if(role === 'admin'){
            return(
                <div>
                    {listMembers.map(item => 
                        <div key={item.id}>{item.startHours}
                                    <button onClick={() => addMember(item.id)}>Add Member</button>
                            {item.members.map(member => 
                                <div key={member.id}>
                                    <p>{member.name} {member.lastName}</p> <button onClick={() => removeMember(member.id, item.id)}>Remove</button>
                                </div>
                                )}
                        </div> 
                    )}
                </div>
            )
        } else {
            return(
                <div>
                    <p>Ovde mozes procitati vise o nasim organizacijama</p>
                    <a href="https://www.levi9.com/">Levi9</a>
                    <a href="https://inside.rs.levi9.com/">Levi9 - inside</a>
                    <a href="https://www.crossfit.com/">CrossFit</a>
                </div>
            )
        }
    }
    return (
        <div className='wrapper-home'>
            <h1>Welcome, {name}</h1>

            {renderContent()}
        </div>
    );
}

export default Home;
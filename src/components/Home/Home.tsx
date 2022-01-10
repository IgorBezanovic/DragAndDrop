import React, { useState } from 'react';
import { listTrainings } from '../../service/listTrainings'
import './style.css'

const Home: React.FC = () => {
    const name :string | null = localStorage.getItem('name');
    const role :string | null = localStorage.getItem('role');

    const renderContent = () => {
        if(role === 'admin'){
            console.log(listTrainings)
            return(
                <div>
                    {listTrainings.map(item => <div key={item.id}>{item.startHours},  {item.members.map(member => <div key={member.id}>{member.name} {member.lastName}</div>)}</div> )}
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
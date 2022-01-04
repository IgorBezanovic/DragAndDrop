import React from 'react';
import './style.css'

const Home: React.FC = () => {
    const name :string | null = localStorage.getItem('name');

    return (
        <div className='wrapper-home'>
            <h1>Welcome, {name}</h1>
            <p>Ovde mozes procitati vise o nasim organizacijama</p>
            <a href="https://www.levi9.com/">Levi9</a>
            <a href="https://inside.rs.levi9.com/">Levi9 - inside</a>
            <a href="https://www.crossfit.com/">CrossFit</a>
        </div>
    );
}

export default Home;
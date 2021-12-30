import React from 'react';
import './style.css'

const Login: React.FC = () => {
    class Values {
        username: String;
        password: String ;

        constructor( username: string, password: string ) {
            this.username = username;
            this.password = password;
          }
    }

    // let values :Values = new Values('Igor', 'Bezanovic');
    let values :Values;
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // localStorage.setItem('token', 'Igor');
        // localStorage.setItem('token', '');

        return ({ ...values, [event.target.name]: event.target.value });
    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const users = [
            {id: '1', username: 'Igor', password: 'Bezanovic', role: 'admin'}, 
            {id: '2', username: 'Aleksa', password: 'Ivkovic', role: 'admin'}, 
            {id: '3', username: 'Igor', password: 'Dragutinovic', role: 'user'}
        ];
        
        console.log(users.map(user => user.username === values.username && user.password === values.password))
        users.map(user => user.username === values.username && user.password === values.password)
        console.log(...values.username)
    }

    return ( 
        <div className='wrapper'>
            <div className='wrapper-form'>
                <h2 className='title'>Please Log In</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        <p className='label-name'>Username:</p>
                        <input 
                            type="text" 
                            name='username' 
                            onChange={onChange}
                            />
                    </label>
                    <label>
                        <p className='label-name'>Password:</p>
                        <input 
                            type="password" 
                            name='password' 
                            onChange={onChange}
                            />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
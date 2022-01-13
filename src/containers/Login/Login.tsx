import React, { ReactElement, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Values } from "../../types/values.model"
import { users } from "../../service/listUsers"
import './style.css'

const Login = () :ReactElement => {
    let history = useHistory();
    let [form, setForm] = useState<Values>({
        username: "",
        password: ""
    });

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Values) => {
        setForm({
            ...form,
            [field]: e.target.value,
        });
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let user = users.find(
            (e) => e.username === form.username && e.password === form.password
        );

        if(user){
            localStorage.setItem('name', user.username);
            localStorage.setItem('lastName', user.password);
            localStorage.setItem('role', user.role);
            history.push('/home');
        }
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
                            onChange={(e) => updateForm(e, 'username')}
                            value={form.username}
                            />
                    </label>
                    <label>
                        <p className='label-name'>Password:</p>
                        <input 
                            type="password" 
                            name='password' 
                            onChange={(e) => updateForm(e, 'password')}
                            value={form.password}
                            />
                    </label>
                    <div>
                        <button className='submit' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { Values } from "../../types/values.model";
import { users } from "../../service/listUsers";
import "./style.css";
import Popup from "../../common//popup/popup";

const Login = (): ReactElement => {
  let history = useHistory();
  let [form, setForm] = useState<Values>({
    username: "",
    password: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const popupLogic = (title: string, content: string) => {
    togglePopup();
    setTitle(title);
    setContent(content);
    setTimeout(() => setIsOpen(false), 3000);
  };

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Values
  ) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let user = users.find(
      (e) => e.username === form.username && e.password === form.password
    );

    if (user) {
      localStorage.setItem("name", user.username);
      localStorage.setItem("lastName", user.password);
      localStorage.setItem("role", user.role);
      window.location.reload()
      history.push("/home");
    } else {
      popupLogic("Loging in", "Ne postoji korisnik sa unetim kredencijalima. Proverite da li ste tacno uneli svoje podatke. Ukoliko jeste, kontaktiraje nas trening centar na 06x/ xxx - xx -xx")
    }
  };

  return (
    <div className="wrapper">
      <div className="wrapper-form">
        <h2 className="title">Please Log In</h2>
        <form onSubmit={handleLogin}>
          <label>
            <p className="label-name">Username:</p>
            <input
              type="text"
              name="username"
              onChange={(e) => updateForm(e, "username")}
              value={form.username}
            />
          </label>
          <label>
            <p className="label-name">Password:</p>
            <input
              type="password"
              name="password"
              onChange={(e) => updateForm(e, "password")}
              value={form.password}
            />
          </label>
          <div>
            <button className="submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {isOpen && (
        <Popup
          title={popupTitle}
          content={popupContent}
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default Login;

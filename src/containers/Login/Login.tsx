import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { Values } from "../../types/values.model";
import listUsers from "../../service/listUsers";
import "./style.css";
import Popup from "../../common/Popup/popup";
import BoxAccept from "../../components/AcceptTerms";
import green from "@mui/material/colors/green";

const Login = (): ReactElement => {
  let history = useHistory();
  let [form, setForm] = useState<Values>({
    username: "",
    password: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");
  let userList = listUsers.listUsers;
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef<number>();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
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

    let user = userList.find(
      (e) => e.username === form.username && e.password === form.password
    );

    if (user) {
      if(success){
        localStorage.setItem("id", user.id)
        window.location.reload()
        history.push("/home");
      } else {
        popupLogic("Loging in", "treba da procitate nase uslove i da cekirate Terms")
      }
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
              className="form-input"
              onChange={(e) => updateForm(e, "username")}
              value={form.username}
            />
          </label>
          <label>
            <p className="label-name">Password:</p>
            <input
              type="password"
              name="password"
              className="form-input"
              onChange={(e) => updateForm(e, "password")}
              value={form.password}
            />
          </label>
          <p>Our<a href="https://www.levi9.com/about/" target="_blank" rel="noreferrer">Terms and Conditions</a></p>
          <BoxAccept
            buttonSx={buttonSx}
            handleButtonClick={handleButtonClick}
            success={success}
            loading={loading}

          />
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

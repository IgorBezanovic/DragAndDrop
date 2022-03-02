import React, { ReactElement, useState } from "react";
// import { useHistory } from "react-router-dom";
import listUsers from "../../service/listUsers";
import "./style.css";
// import Popup from "../../common/Popup/popup";
import BoxAccept from "../../components/AcceptTerms";
import green from "@mui/material/colors/green";
import { LOGIN, LOGIN_INFO, TERMS } from "../../common/constants";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../common/validation";
import Popup from "../../common/Popup/popup";

const Login = (): ReactElement => {
  // let history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupTitle, setTitle] = useState<string>("");
  const [popupContent, setContent] = useState<string>("");
  let userList = listUsers.listUsers;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef<number>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let user = userList.find(
      (e) =>
        e.username === formik.values.username &&
        e.password === formik.values.password
    );

    if (!user) {
      popupLogic(LOGIN, LOGIN_INFO);
      return;
    }
    if (success) {
      localStorage.setItem("id", user.id);
      window.location.reload();
      // history.push("/home");
    } else {
      popupLogic(LOGIN, TERMS);
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </label>
          {formik.touched.username ? (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {formik.errors.username}
            </p>
          ) : null}
          <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
            <InputLabel htmlFor="password">Password:</InputLabel>
            <FilledInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {formik.touched.password ? (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {formik.errors.password}
            </p>
          ) : null}
          <p>
            Our&nbsp;
            <a
              href="https://www.levi9.com/about/"
              target="_blank"
              rel="noreferrer"
            >
              Terms and Conditions
            </a>
          </p>
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

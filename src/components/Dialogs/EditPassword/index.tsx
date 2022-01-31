import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import {
  ENTER_THE_NAME,
  ENTER_THE_NEW_PASSWORD,
  ENTER_THE_REPEAT_PASSWORD,
} from "../../../common/constants";
import Dialog from "../../../common/Dialog/dialog";
import { Values } from "../../../types/values.model";

const EditPassword = ({
  title,
  content,
  handleClose,
  open,
  addTraining,
  handleChangeUser,
  user,
  handleClickShowPassword,
  handleClickShowRepeatPassword,
  handleMouseDownPassword,
  showPassword,
  showRepeatPassword,
}: {
  title: string;
  content: string;
  handleClose: () => void;
  open: boolean;
  addTraining: () => void;
  handleChangeUser: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: keyof Values
  ) => void;
  user: Values;
  handleClickShowPassword: () => void;
  handleClickShowRepeatPassword: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPassword: boolean;
  showRepeatPassword: boolean;
}) => (
  <Dialog
    title={title}
    content={content}
    handleClose={handleClose}
    open={open}
    addFunction={addTraining}
  >
    <TextField
      margin="dense"
      id="username"
      label={ENTER_THE_NAME}
      type="text"
      fullWidth
      variant="standard"
      onChange={(e) => handleChangeUser(e, "username")}
      value={user.username}
    />
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password">
          {ENTER_THE_NEW_PASSWORD}
        </InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={showPassword ? "text" : "password"}
          value={user.newPassword}
          onChange={(e) => handleChangeUser(e, "newPassword")}
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
      <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password-second">
          {ENTER_THE_REPEAT_PASSWORD}
        </InputLabel>
        <FilledInput
          id="filled-adornment-password-second"
          type={showRepeatPassword ? "text" : "password"}
          value={user.repeatPassword}
          onChange={(e) => handleChangeUser(e, "repeatPassword")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRepeatPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  </Dialog>
);
export default EditPassword;

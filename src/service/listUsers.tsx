import { ListUsers } from "../classes/Users";

let users: ListUsers = new ListUsers([
  { id: "1", username: "Igor", password: "Bezanovic", role: "admin" },
  { id: "2", username: "Aleksa", password: "Ivkovic", role: "admin" },
  { id: "3", username: "Igor", password: "Dragutinovic", role: "user" },
]);

export default users;

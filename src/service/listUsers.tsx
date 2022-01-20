import { ListUsers } from "../classes/Users";

let users: ListUsers = new ListUsers([
  { id: "1", username: "Igor", password: "Bezanovic", role: "admin", numTrainings: 14 },
  { id: "2", username: "Aleksa", password: "Ivkovic", role: "admin",  numTrainings: 18},
  { id: "3", username: "Igor", password: "Dragutinovic", role: "user",  numTrainings: 16},
]);

export default users;

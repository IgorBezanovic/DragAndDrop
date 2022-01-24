import { ListUsers } from "../classes/Users";

let users: ListUsers = new ListUsers([
  { id: "1", username: "Igor", lastName: "Bezanovic", password: "Bezanovic", role: "admin", numTrainings: 14 },
  { id: "2", username: "Aleksa", lastName: "Ivkovic", password: "Ivkovic", role: "admin",  numTrainings: 18},
  { id: "3", username: "Igor", lastName: "Dragutinovic", password: "Dragutinovic", role: "user",  numTrainings: 16},
]);

export default users;

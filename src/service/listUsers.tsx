import { ListUsers } from "../classes/Users";

let users: ListUsers = new ListUsers([
  { id: "1", username: "Igor", lastName: "Bezanovic", password: "Bezanovic123", role: "admin", numTrainings: 14 },
  { id: "2", username: "Aleksa", lastName: "Ivkovic", password: "Ivkovic123", role: "admin",  numTrainings: 18},
  { id: "3", username: "Igor", lastName: "Dragutinovic", password: "Dragutinovic123", role: "admin",  numTrainings: 16},
  { id: "4", username: "Milan", lastName: "Kadija", password: "Kadija123", role: "user",  numTrainings: 14},
  { id: "5", username: "Zoran", lastName: "Stojanovic", password: "Stojanovic123", role: "user",  numTrainings: 8},
  { id: "6", username: "Jovan", lastName: "Utvic", password: "Utvic123", role: "user",  numTrainings: 6},
  { id: "7", username: "Jovana", lastName: "Utvic", password: "Utvic123", role: "user",  numTrainings: 11},
  { id: "8", username: "Ivana", lastName: "Sekeres", password: "Sekeres123", role: "user",  numTrainings: 12},
  { id: "9", username: "Olivera", lastName: "Zdelar", password: "Zdelar123", role: "user",  numTrainings: 15},
  { id: "10", username: "Viktor", lastName: "Savic", password: "Savic123", role: "user",  numTrainings: 1},
  { id: "11", username: "Stojan", lastName: "Mirkovic", password: "Mirkovic123", role: "user",  numTrainings: 0},
  { id: "12", username: "Radoje", lastName: "Markovic", password: "Markovic123", role: "user",  numTrainings: 20},
  { id: "13", username: "Lepoje", lastName: "Petrovic", password: "Petrovic123", role: "user",  numTrainings: 13},
  { id: "14", username: "Stanoje", lastName: "Radic", password: "Radic123", role: "user",  numTrainings: 12},
  { id: "15", username: "Milica", lastName: "Ostojic", password: "Ostojic123", role: "user",  numTrainings: 10},
  { id: "16", username: "Nikolina", lastName: "Romakov", password: "Romakov123", role: "user",  numTrainings: 3},
]);

export default users;

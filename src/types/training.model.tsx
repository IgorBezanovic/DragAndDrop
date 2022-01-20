import { User } from './user.model'

export type Training = {
    id: string;
    day: string;
    startHours: string;
    freeSpace: number;
    extraTermin: boolean;
    members: User[];
  };
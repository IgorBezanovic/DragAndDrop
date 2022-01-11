import { Member } from './member.model'

export type Training = {
    id: number;
    day: string;
    startHours: string;
    freeSpace: number;
    members: Member[];
  };
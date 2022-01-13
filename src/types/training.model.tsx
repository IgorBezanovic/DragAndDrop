import { Member } from './member.model'

export type Training = {
    id: string;
    day: string;
    startHours: string;
    freeSpace: number;
    members: Member[];
  };
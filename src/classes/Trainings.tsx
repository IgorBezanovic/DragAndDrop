import { Training } from "../types/training.model";
import { Member } from "../types/member.model";

export class ListTrainings {
  public listTrainings: Training[];

  constructor(listTrainings: Training[]) {
    this.listTrainings = listTrainings;
  }

  public addTraining(training: Training) {
    this.listTrainings.push(training);
    this.listTrainings = this.listTrainings.sort((a, b) => (a.day).localeCompare(b.day));
  }

  public removeTraining(trainingId: string) {
    this.listTrainings = this.listTrainings.filter((item) => item.id !== trainingId);
  }

  public addMember(trainingId: string, member: Member) {
    let foundIndex: number = this.listTrainings.findIndex(
      (item) => item.id === trainingId
    );
    this.listTrainings[foundIndex].members.push(member);
    this.listTrainings[foundIndex].freeSpace = --this.listTrainings[foundIndex]
      .freeSpace;
  }

  public removeMember(trainingId: string, memberId: string) {
    let foundIndex: number = this.listTrainings.findIndex(
      (item) => item.id === trainingId
    );

    this.listTrainings[foundIndex].freeSpace = ++this.listTrainings[foundIndex]
      .freeSpace;
    this.listTrainings[foundIndex].members = this.listTrainings[
      foundIndex
    ].members.filter((member) => member.id !== memberId);
  }
}

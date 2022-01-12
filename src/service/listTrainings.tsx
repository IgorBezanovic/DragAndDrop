import { Training } from "../types/training.model";
import { Member } from "../types/member.model";

export class ListTrainings {
  public listTrainings: Training[];

  constructor(listTrainings: Training[]) {
    this.listTrainings = listTrainings;
  }

  public addTraining(training: Training) {
    this.listTrainings.push(training);
  }

  public removeTraining(trainingId: number) {
    this.listTrainings = this.listTrainings.filter((item) => item.id !== trainingId);
  }

  public addMember(trainingId: number, member: Member) {
    let foundIndex: number = this.listTrainings.findIndex(
      (item) => item.id === trainingId
    );
    this.listTrainings[foundIndex].members.push(member);
    this.listTrainings[foundIndex].freeSpace = --this.listTrainings[foundIndex]
      .freeSpace;
  }

  public removeMember(trainingId: number, memberId: number) {
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

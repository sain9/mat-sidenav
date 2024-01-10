// support-compensation.model.ts

export class SupportCompensation {
    id: number;
    supportName: string;
    compensationAmount: number;
    compensationDate: Date;
  
    constructor(id: number, supportName: string, compensationAmount: number, compensationDate: Date) {
      this.id = id;
      this.supportName = supportName;
      this.compensationAmount = compensationAmount;
      this.compensationDate = compensationDate;
    }
  }
  
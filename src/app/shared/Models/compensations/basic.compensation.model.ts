// basic-compensation.model.ts

export class BasicCompensation {
    id: number;
    employeeName: string;
    compensationAmount: number;
    compensationDate: Date;
  
    constructor(id: number, employeeName: string, compensationAmount: number, compensationDate: Date) {
      this.id = id;
      this.employeeName = employeeName;
      this.compensationAmount = compensationAmount;
      this.compensationDate = compensationDate;
    }
  }
  
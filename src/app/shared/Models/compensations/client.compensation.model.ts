export class ClientCompensation {
    id: number;
    clientName: string;
    compensationAmount: number;
    compensationDate: Date;
  
    constructor(id: number, clientName: string, compensationAmount: number, compensationDate: Date) {
      this.id = id;
      this.clientName = clientName;
      this.compensationAmount = compensationAmount;
      this.compensationDate = compensationDate;
    }
  }
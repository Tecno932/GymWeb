export class PaymentResponseDto {

  id!: string;

  membershipId!: string;

  amount!: number;

  method!: string;

  observations?: string;

  paidAt!: Date;

  createdAt!: Date;

}
import {
  IsDateString,
  IsOptional,
} from 'class-validator';


export class CheckoutAttendanceDto {

  @IsOptional()
  @IsDateString()
  checkOut?: string;

}
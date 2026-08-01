import {
  IsNotEmpty,
  IsString,
} from 'class-validator';


export class CreateAttendanceDto {

  @IsString()
  @IsNotEmpty()
  memberId!: string;

}
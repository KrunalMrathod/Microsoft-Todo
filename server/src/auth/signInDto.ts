import { IsNotEmpty } from 'class-validator';

export class signInDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

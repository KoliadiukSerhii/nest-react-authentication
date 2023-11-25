import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 100, {
    message: 'The password must be no shorter than 3 characters',
  })
  public password: string;
}

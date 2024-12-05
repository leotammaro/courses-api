import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;
  @IsNotEmpty()
  @IsString()
  externalId: string;
  @IsOptional()
  @IsBoolean()
  isVerified: boolean;
}

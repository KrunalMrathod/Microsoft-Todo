import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

function IsValidPassword(validationOptions?: { message?: string }) {
  return function (object: Object, propertyName: string) {
    Matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          validationOptions?.message ||
          'Password must contain at least 8 characters, including one lowercase letter, one uppercase letter, one digit, and one special character.',
      },
    )(object, propertyName);
  };
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @MinLength(8)
  @IsValidPassword()
  password: string;

  @Column()
  @IsNotEmpty()
  userName: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

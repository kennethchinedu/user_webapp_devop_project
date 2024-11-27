import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHashService {
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(
    formPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(formPassword, dbPassword);
  }
}

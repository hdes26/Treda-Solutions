import * as bcryptjs from 'bcryptjs';

export class PasswordService {
  encryptPassword(password: string): string {
    return bcryptjs.hashSync(password, 10);
  }

  comparePassword(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  }
}

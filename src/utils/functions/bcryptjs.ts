import * as bcryptjs from 'bcrypt';

export function encryptPassword(password: string) {
  return bcryptjs.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcryptjs.compareSync(password, hash);
}

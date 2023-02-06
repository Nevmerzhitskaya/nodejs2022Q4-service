import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export type UserEntity = {
  id: string; // uuid v4
  login: string;
  password?: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number;
};

type CreateUserDTO = Omit<UserEntity, 'id'>;
type ChangeUserDTO = Partial<Omit<UserEntity, 'id'>>;

export default class DBUsers extends DBEntity<
  UserEntity,
  ChangeUserDTO,
  CreateUserDTO
> {
  async create(dto: CreateUserDTO) {
    console.log('dto',dto);
    const created: UserEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}

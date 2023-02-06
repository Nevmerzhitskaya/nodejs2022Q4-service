import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export type ArtistEntity = {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
};
type CreateArtistDTO = Omit<ArtistEntity, 'id'>;
type ChangeArtistDTO = Partial<Omit<ArtistEntity, 'id'>>;

export default class DBArtists extends DBEntity<
  ArtistEntity,
  ChangeArtistDTO,
  CreateArtistDTO
> {
  async create(dto: CreateArtistDTO) {
    const created: ArtistEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}

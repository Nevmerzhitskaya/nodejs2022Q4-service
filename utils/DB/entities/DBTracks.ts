import * as crypto from 'node:crypto';
import DBEntity from './DBEntity';

export type TrackEntity = {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // 
};
type CreateTrackDTO = Omit<TrackEntity, 'id'>;
type ChangeTrackDTO = Partial<Omit<TrackEntity, 'id'>>;

export default class DBTracks extends DBEntity<
  TrackEntity,
  ChangeTrackDTO,
  CreateTrackDTO
> {
  async create(dto: CreateTrackDTO) {
    const created: TrackEntity = {
      ...dto,
      id: crypto.randomUUID(),
    };
    this.entities.push(created);
    return created;
  }
}

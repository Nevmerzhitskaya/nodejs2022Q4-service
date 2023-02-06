import DBEntity from './DBEntity';

export type FavoriteEntity = {
  id: string;
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
};
type CreateFavoriteDTO = Omit<FavoriteEntity, 'id'>;
type ChangeFavoriteDTO = Partial<Omit<FavoriteEntity, 'id'>>;

export default class DBFavorites extends DBEntity<
  FavoriteEntity,
  ChangeFavoriteDTO,
  CreateFavoriteDTO
> {
  async create(dto: CreateFavoriteDTO) {
    const created: FavoriteEntity = {
      ...dto,
      id: ''
    };
    this.entities.push(created);
    return created;
  }
}

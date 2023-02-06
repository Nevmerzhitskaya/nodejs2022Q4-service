import DBEntity from './DBEntity';

export type AlbumEntity = {
  id: string;
  discount: number;
  monthPostsLimit: number;
};
type CreateAlbumDTO = AlbumEntity;
type ChangeAlbumDTO = Partial<Omit<AlbumEntity, 'id'>>;

export default class DBAlbums extends DBEntity<
AlbumEntity,
  ChangeAlbumDTO,
  CreateAlbumDTO
> {
  constructor() {
    super();

    this.create({
      id: 'basic',
      discount: 0,
      monthPostsLimit: 20,
    });
    this.create({
      id: 'business',
      discount: 5,
      monthPostsLimit: 100,
    });

    const forbidOperationTrap: ProxyHandler<any> = {
      apply(target) {
        throw new Error(
          `forbidden operation: cannot ${target.name} a member type`
        );
      },
    };

    this.delete = new Proxy(this.delete, forbidOperationTrap);
    this.create = new Proxy(this.create, forbidOperationTrap);
  }

  async create(dto: CreateAlbumDTO) {
    const created: AlbumEntity = {
      ...dto,
    };
    this.entities.push(created);
    return created;
  }
}

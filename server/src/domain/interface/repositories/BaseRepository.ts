

export interface BaseRepository<T>{
    create (entity:T) : Promise<T>;
    findById(_id:string) : Promise<T>;
    update (entity:T) : Promise<void>;
    delete(_id:string) : Promise<void>
}
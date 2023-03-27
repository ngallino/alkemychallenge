import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { Reclamo } from './entities/reclamo.entity';
import { CreateReclamoInput } from './dto/inputs/create-reclamo.input';
import { User } from 'src/users/entities/user.entity';
import { UpdateReclamoInput } from './dto/inputs/update-reclamo.input';


@Injectable()
export class ReclamosService {

  constructor(
    @InjectRepository( Reclamo )
    private readonly reclamosRepository: Repository<Reclamo>,

  ) {}


  async create( createReclamoInput: CreateReclamoInput, usuario: User ): Promise<Reclamo> {

    const newItem = this.reclamosRepository.create({ ...createReclamoInput, usuario })
    return await this.reclamosRepository.save( newItem );
  }

  async findAll( user: User, paginationArgs: PaginationArgs, searchArgs: SearchArgs ): Promise<Reclamo[]> {

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;
    
    const queryBuilder = this.reclamosRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )

    if ( search ) {
      queryBuilder.andWhere('LOWER(titulo) like :titulo', { titulo: `%${ search.toLowerCase() }%` });
    }

    return queryBuilder.getMany();
  }

  async findOne( id: string, user: User ): Promise<Reclamo> {

    const item = await this.reclamosRepository.findOneBy({ 
      id,
    });

    if ( !item ) throw new NotFoundException(`Item with id: ${ id } not found`);

    // item.user = user;

    return item;
  }


  async findOneTitulo ( term : string) : Promise <Reclamo[]>{
    return await this.reclamosRepository.find ({ where: {titulo : term}})
  }


  async update(id: string, updateReclamoInput: UpdateReclamoInput, user: User ): Promise<Reclamo> {
    
    await this.findOne( id, user );
    //? const item = await this.itemsRepository.preload({ ...updateItemInput, user });
    const item = await this.reclamosRepository.preload( updateReclamoInput );

    if ( !item ) throw new NotFoundException(`Item with id: ${ id } not found`);

    return this.reclamosRepository.save( item );

  }
  

  async remove( id: string, user: User ):Promise<Reclamo> {

    // TODO: soft delete, integridad referencial
    const item = await this.findOne( id, user );
    await this.reclamosRepository.remove( item );
    return { ...item, id };
  }

  async itemCountByUser( user: User ): Promise<number> {
    
    return this.reclamosRepository.count({
      where: {
        usuario: {
          id: user.id
        }
      }
    })

  }

}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginationArgs, SearchArgs } from './../common/dto/args';

import { Reclamo } from './entities/reclamo.entity';
import { CreateReclamoInput } from './dto/inputs/create-reclamo.input';
import { User } from 'src/users/entities/user.entity';
import { UpdateReclamoInput } from './dto/inputs/update-reclamo.input';
import { DetalleDeCompra } from './entities/detalledecompra.entity';
import { CreateDetalleCompraDto } from './dto/inputs/detalledecompra.input';
import { log } from 'console';


@Injectable()
export class ReclamosService {

  constructor(
    @InjectRepository( Reclamo )
    private readonly reclamosRepository: Repository<Reclamo>,

    @InjectRepository (DetalleDeCompra)
    private readonly detalleRepository: Repository <DetalleDeCompra>

  ) {}


  async create( createReclamoInput: CreateReclamoInput, detallecompra:CreateDetalleCompraDto, usuario: User ): Promise<Reclamo> {
  
    const detalle = this.detalleRepository.create(detallecompra)
    const newItem = this.reclamosRepository.create({ 
      ...createReclamoInput,
      detalleDeCompra: detalle,
      usuario 
    })
    try{
      return await this.reclamosRepository.save( newItem );
    }
    catch(error){
      throw new BadRequestException(error);
    }
  }

  async findAll( user: User, paginationArgs: PaginationArgs, searchArgs: SearchArgs ): Promise<Reclamo[]> {

    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;
    
    const queryBuilder = this.reclamosRepository.createQueryBuilder('reclamos')
      .take( limit )
      .skip( offset )
      .leftJoinAndSelect('reclamos.detalleDeCompra', 'detallesDeCompra')

    if ( search ) {
      queryBuilder.andWhere('LOWER(titulo) like :titulo', { titulo: `%${ search.toLowerCase() }%` });
    }

    return queryBuilder.getMany();
  }


  async findOne( id: string, user: User ): Promise<Reclamo> {

    const item = await this.reclamosRepository.findOne({ 
      where: {id: id},
      relations: ['detalleDeCompra']
    });

    if ( !item ) throw new NotFoundException(`Item with id: ${ id } not found`);

    // item.user = user;

    return item;
  }


  async findOneTitulo ( term : string) : Promise <Reclamo[]>{
    return await this.reclamosRepository.find ({ where: {titulo : term}})
  }


  async update(id: string, updateReclamoInput: UpdateReclamoInput, user: User ): Promise<Reclamo> {
    
    const item =  await this.reclamosRepository.findOne({ 
      where: {id: id},
      relations: ['detalleDeCompra']
    });
    
    if ( !item ) throw new NotFoundException(`Item with id: ${ id } not found`);
    
   const test= await this.reclamosRepository.save({
      ...item, 
      ...updateReclamoInput 
    });

    return test;
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

  async addImage(reclamoId:string, user:User, imageUrl: string ){
    const reclamo = await this.findOne (reclamoId, user)
    return await this.reclamosRepository.save({
      ...reclamo,
      imagen:imageUrl
    });
  }

}

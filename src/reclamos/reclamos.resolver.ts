import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

import { PaginationArgs, SearchArgs } from '../common/dto/args';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Reclamo } from './entities/reclamo.entity';
import { ReclamosService } from './reclamos.service';
import { CreateReclamoInput } from './dto/inputs/create-reclamo.input';
import { UpdateReclamoInput } from './dto/inputs/update-reclamo.input';

@Resolver(() => Reclamo)
@UseGuards( JwtAuthGuard )
export class ReclamosResolver {
  constructor(private readonly reclamosService: ReclamosService) {}

  @Mutation(() => Reclamo, { name: 'createReclamo' })
  async createItem(
    @Args('createReclamoInput') createReclamoInput: CreateReclamoInput,
    @CurrentUser() user: User
  ): Promise<Reclamo> {
    return this.reclamosService.create( createReclamoInput, user );
  }


  @Query(() => [Reclamo], { name: 'reclamos' })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Reclamo[]> {

    return this.reclamosService.findAll( user, paginationArgs, searchArgs );
  }


  @Query(() => Reclamo, { name: 'item' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser() user: User
  ): Promise<Reclamo> {
    return this.reclamosService.findOne(id, user );
  }


  @Query(() => [Reclamo], { name: 'buscarPorTitulo' })
  async findOneTitulo(
    @Args('term') term: string,
  ): Promise<Reclamo[]> {

    return this.reclamosService.findOneTitulo( term );
  }


  @Mutation(() => Reclamo)
  updateItem(
    @Args('updateItemInput') updateReclamoInput: UpdateReclamoInput,
    @CurrentUser() user: User
  ):Promise<Reclamo> {
    return this.reclamosService.update( updateReclamoInput.id, updateReclamoInput, user );
  }

  
  @Mutation(() => Reclamo)
  removeItem(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ): Promise<Reclamo> {
    return this.reclamosService.remove(id, user);
  }
}

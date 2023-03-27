import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength, Min, MinLength } from 'class-validator';
import { DetalleDeCompra } from '../../entities/detalledecompra.entity';
import { CreateDetalleCompraDto } from './detalledecompra.input';

@InputType()
export class CreateReclamoInput {
  
  @Field( () => Number )
  @Min(0)
  numerodereclamo: number;

  @Field( () => String )
  @MaxLength(12)
  @MinLength(2)
  @Field( () => String )
  titulo: string;

  @Field( () => String )
  @MaxLength(30)
  @MinLength(3)
  descripcion: string;

  @Field( () => CreateDetalleCompraDto )
  detalledecompra: CreateDetalleCompraDto;

}

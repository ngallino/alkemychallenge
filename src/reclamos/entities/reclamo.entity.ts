import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleDeCompra } from './detalledecompra.entity';

@Entity({ name: 'reclamos' })
@ObjectType()
export class Reclamo {
  
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field( () => String )
  titulo: string;
  
  @Column()
  @Field( () => Number )
  numerodereclamo: number;
  
  @Column()
  @Field( () => String )
  descripcion: string;
 

  @Field()
  @OneToOne(
    () => DetalleDeCompra, {onDelete: 'CASCADE'}
  )
  detalleDeCompra: DetalleDeCompra;

  @ManyToOne(
    () => User, (user) => user.id, {eager:true, onDelete:'CASCADE'}
    )
  usuario : User

}

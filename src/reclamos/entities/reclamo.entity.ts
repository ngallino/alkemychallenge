import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  
  @Column({unique: true})
  @Field( () => Number )
  numerodereclamo: number;
  
  @Column()
  @Field( () => String )
  descripcion: string;
 

  @Field()
  @OneToOne(
    () => DetalleDeCompra, detalle => detalle.reclamo,  {
      cascade: true,
       }
    )
  @JoinColumn()
  detalleDeCompra: DetalleDeCompra;

  @ManyToOne(
    () => User, (user) => user.id, {eager:true, onDelete:'CASCADE'}
    )
  usuario : User


  @Column({nullable: true})
  @Field( () => String, {nullable: true})
  imagen?: string

}

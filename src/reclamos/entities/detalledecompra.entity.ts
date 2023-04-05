import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reclamo } from './reclamo.entity';


@Entity({ name: 'detallesDeCompra' })
@ObjectType()
export class DetalleDeCompra {
  
    @PrimaryGeneratedColumn('uuid')
    @Field( () => ID )
    id: string;

    @Column()
    @Field( () => Number )
    factura: number;
    
    @Column()
    @Field( () => String )
    codProd: string;
    
    @Column()
    @Field( () => String )
    fecha: string;

    @OneToOne(
        () => Reclamo, reclamo => reclamo.detalleDeCompra, {   
          eager: true,         
        }
        )
      reclamo: Reclamo;
}
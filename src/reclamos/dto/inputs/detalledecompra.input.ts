import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, Min, MinLength } from "class-validator";


@InputType()
export class CreateDetalleCompraDto {
  
  @Min(1)
  @Field( () => Number )
  factura: number;
  
  @Field( () => String )
  @MaxLength(30)
  @MinLength(1)
  codProd: string;
  
  @Field( () => String )
  @MinLength(3)
  fecha: string;
}
import { Field, InputType } from "@nestjs/graphql";
import { MaxLength, Min, MinLength } from "class-validator";


@InputType()
export class CreateDetalleCompraDto {
  
  @Field( () => String )
  @Min(3)
  fecha: string;

  @Field( () => Number )
  @Min(1)
  @Field( () => Number )
  factura: number;

  @Field( () => String )
  @MaxLength(30)
  @MinLength(1)
  codProd: string;

}
import { CreateReclamoInput } from './create-reclamo.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateReclamoInput extends PartialType(CreateReclamoInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: string;

}

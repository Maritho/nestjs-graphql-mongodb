import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
import { NewRecipeInput } from './new-recipe.input';

@InputType()
export class UpdateRecipeInput extends PartialType(NewRecipeInput) {
  @Field(() => String)
  _id: string;
}
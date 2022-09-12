import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewRecipeInput {
  @Field( () => String, {description: 'Title'})
  @MaxLength(30)
  title: string;

  @Field(() => String, { nullable: true, description: "Description"})
  @IsOptional()
  @Length(3, 255)
  description?: string;

  @Field(() => [String], {description: 'Ingredients'})
  ingredients: string[];
}
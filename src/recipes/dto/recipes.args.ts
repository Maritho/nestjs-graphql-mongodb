import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class RecipesArgs {
  @Field(type => Int)
  @Min(0)
  skip = 0;

  @Field(type => Int)
  @Min(1)
  @Max(50)
  take = 25;
}
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType({ description: 'recipe ' })
export class Recipe {
    @Field(type => String)
    _id: MongooseSchema.Types.ObjectId;
    id: string;

    @Prop()
    @Directive('@upper')
    @Field({ nullable: false })
    title: string;

    @Prop()
    @Field({ nullable: true })
    description?: string;

    @Prop()
    @Field()
    creationDate: Date;

    @Prop()
    @Field(type => [String])
    ingredients: string[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe)
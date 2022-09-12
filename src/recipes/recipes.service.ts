import { Injectable, NotFoundException } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe.name)
        private readonly recipeModel: Model<Recipe>
    ) { }

    async create(data: NewRecipeInput) {
        return new this.recipeModel(data).save();
    }

    async findOne(id: string): Promise<Recipe> {
        const recipe = await this.recipeModel.findOne({ _id: id }).exec();
        if (!recipe) {
            throw new NotFoundException(`Recipe ${id} not found`);
        }
        return recipe;

    }

    async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
        return this.recipeModel.find().skip(recipesArgs.skip).limit(recipesArgs.take).exec();
    }

    async update(id: string, updateRecipeInput: UpdateRecipeInput) {
        const existingRecipe = await this.recipeModel
            .findOneAndUpdate({ _id: id }, { $set: updateRecipeInput }, { new: true })
            .exec();

        if (!existingRecipe) {
            throw new NotFoundException(`Recipe ${id} not found`);
        }

        return existingRecipe;
    }

    async remove(id: string) {
        this.recipeModel.deleteOne({
            _id: id
        });
        
        return {
            _id: id
        }
    }
}
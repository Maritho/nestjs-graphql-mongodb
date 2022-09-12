import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver(() => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesService: RecipesService) { }

    @Mutation(() => Recipe)
    createRecipe(@Args('newRecipeInput') newRecipeInput: NewRecipeInput) {
        return this.recipesService.create(newRecipeInput);
    }

    @Query(() => [Recipe], { name: 'recipes' })
    findAll(@Args('recipesArgs') recipesArgs: RecipesArgs) {
        return this.recipesService.findAll(recipesArgs);
    }

    @Query(() => Recipe, { name: 'recipe' })
    findOne(@Args('_id', { type: () => String }) id: string) {
        return this.recipesService.findOne(id);
    }

    @Mutation(() => Recipe)
    updateRecipe(@Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput) {
        return this.recipesService.update(updateRecipeInput._id, updateRecipeInput);
    }

    @Mutation(() => Recipe)
    removeRecipe(@Args('_id', { type: () => String }) id: string) {
        return this.recipesService.remove(id);
    }
}
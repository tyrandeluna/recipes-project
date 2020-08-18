import { Recipe } from './recipe.model'
import { Injectable } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs'

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>()
    
    private recipes: Recipe[] = [
        new Recipe(
            'Egg Noodles With Prawns', 
            'A quick midweek meal!', 
            'https://realfood.tesco.com/media/images/1400x919-EggNoodlesPrawn-18d15cbf-c98a-4ede-8d48-19b59ec6af33-0-1400x919.jpg',
            [
                new Ingredient('Red Onion', 1),
                new Ingredient('Egg', 5)
            ]),
        new Recipe(
            'Sunshine Pizza', 
            'Transport yourself to the Mediterranean!', 
            'https://realfood.tesco.com/media/images/RFO-1400x919-Sunshine-pizza-fc90bdc6-bc4f-46cf-b63a-1ff7bc928bc9-0-1400x919.jpg',
            [
                new Ingredient('Egg',2),
                new Ingredient('Yellow Pepper', 1),
                new Ingredient('Orange Pepper', 1)
            ])
    ]
    
    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    getRecipes() {
        return this.recipes.slice()
    }

    getRecipe(id: number) {
        return this.recipes.slice()[id]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }
}
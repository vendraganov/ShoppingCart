import {Ingredient} from "./ingredient.model";

export class Recipe{
  public name: string;
  public description: string;
  public rating: string;
  public imageUrl: string;
  public ingredients: Ingredient[];


  constructor(name: string, description: string, rating: string, imageUrl: string,
              ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
  }
}

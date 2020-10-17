import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router, UrlTree} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../services/recepi.service";
import {CanComponentDeactivate} from "../../services/can-deactivate-guard";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, CanComponentDeactivate {

  index: number;
  editMode: boolean = false;
  changesSaved: boolean = false;
  recipeForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.index = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    })
  }

  private initForm(){
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    let recipeRating = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.index);
      recipeName = recipe.name;
      recipeImageUrl = recipe.imageUrl;
      recipeDescription = recipe.description;
      recipeRating = recipe.rating;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, [Validators.required]),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
       'name': new FormControl(recipeName, [Validators.required]),
       'imageUrl': new FormControl(recipeImageUrl, [Validators.required]),
       'description': new FormControl(recipeDescription, [Validators.required]),
       'rating': new FormControl(recipeRating),
       'ingredients': recipeIngredients
    })
  }

  submit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['rating'],
    //   this.recipeForm.value['imageUrl'],
    //   this.recipeForm.value['ingredients']
    // );
    this.changesSaved = true;
    if(this.editMode){
      this.recipeService.updateRecipe(this.recipeForm.value, this.index);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.doneWithRecipeForm();
  }

  get imagePath(){
    return this.recipeForm.value['imageUrl'];
  }

  get controls() {
    // this returns array with the form group. Without the controls returns FormArray Object
    // console.log((<FormArray>this.recipeForm.get('ingredients')))
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  addIngredientRow() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      }));
  }

  cancel() {
    this.doneWithRecipeForm();
  }

  private doneWithRecipeForm() {
  this.recipeForm.reset();
  this.editMode = false;
  this.index = null;
  // goes one step back
    this.router.navigate(['../'], {relativeTo: this.route} );
}

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.recipeForm.touched);
    console.log(this.changesSaved);
    if(!this.recipeForm.touched && !this.changesSaved){
      return true;
    }
    if(this.recipeForm.touched && !this.changesSaved){
      return confirm('Do you want to discard the changes?');
    }
    else{
      return true;
    }

  }
}

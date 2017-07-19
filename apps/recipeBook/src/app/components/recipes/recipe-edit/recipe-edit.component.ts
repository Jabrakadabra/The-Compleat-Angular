import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../shared/models/recipe.model';

@Component ({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
	id: number;
	editMode = false;
	recipeForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private recipeService: RecipeService,
		private router: Router
	) {}

	ngOnInit() {
		this.route.params
		.subscribe(
			(params: Params) => {
				this.id = parseInt(params.id, 10);
				this.editMode = !!params['id'] === true;
				this.initForm();
			}
		)
	}

	onCancel() {
		this.router.navigate(['../'], { relativeTo: this.route })
		console.log('Forget It!');
	}

	onSubmit() {
		if (this.editMode) {
			this.recipeService.updateRecipe(this.id, this.recipeForm.value);
		} else {
			this.recipeService.addRecipe(this.recipeForm.value);
		}
		this.onCancel();
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				'name': new FormControl(null, Validators.required),
				'amount': new FormControl(null, [
					Validators.required,
					Validators.min(1)
				])
			})
		);
	}

	onDeleteIngredient(index) {
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
		// console.log('delete:', recipeIngredients.value[index]);
	}

	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		let recipeIngredients = new FormArray([]);

		if (this.editMode) {
			const recipe = this.recipeService.getRecipe(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.description;
			if (recipe['ingredients']) {
				for (const ingredient of recipe.ingredients) {
					recipeIngredients.push(
						new FormGroup({
							'name': new FormControl(ingredient.name, Validators.required),
							'amount': new FormControl(ingredient.amount, [
								Validators.required,
								Validators.min(1)
							])
						})
					)
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
			'description': new FormControl(recipeDescription, Validators.required),
			'ingredients': recipeIngredients
		});
	}
}

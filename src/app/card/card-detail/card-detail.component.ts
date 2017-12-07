import { Component, OnInit } from '@angular/core';
import {Card} from '../card.model';
import {CardService} from '../card.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  card: Card;
  id: string;

  constructor(private cardService: CardService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.cardService.getCard(this.id.toString())
            .then(card => this.card = card)
            .catch(error => console.log(error));
        }
      );
  }
/*
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
*/
/*
  onEditRecipe() {
    // recipe-edit.component -> onSubmit -> updaterecipe
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
*/
/*
  onDeleteRecipe() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        } );
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
*/



}

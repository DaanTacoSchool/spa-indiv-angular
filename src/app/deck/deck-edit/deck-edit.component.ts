import { Component, OnInit } from '@angular/core';
import {Deck} from "../deck.model";
import { FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DeckService} from "../deck.service";
import {CardService} from "../../card/card.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.css']
})
export class DeckEditComponent implements OnInit {

  id: string;
  editMode = false;
  deckForm: FormGroup;
  public deck: Deck;
  decks: Deck[];

  private subscription: Subscription;


  constructor(private route: ActivatedRoute,
              private deckService: DeckService,
              private cardService: CardService,
              private router: Router) {
    this.initForm();

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null; //  != null
          console.log('id: '+ this.id + ' --- editmdode: '+this.editMode);
        //  this.initForm();

        });
    //deckSchanged
    this.subscription = this.deckService.decksChanged
      .subscribe(
        (decks: Deck[]) => {
          this.decks = decks;
        }
      );
    this.deckService.getDeck(this.id.toString())
      .then(deck => this.deck = deck)
      .catch(error => console.log( 'error in edit init'+ error));
    this.initForm();
  }

  onSubmit() {
    const newDeck = new Deck(
      this.id,
      this.deckForm.value['name'],
      this.deckForm.value['description'],
      this.deckForm.value['made by'],
      this.deckForm.value['hero'],
      this.deck.cards
      // this.deckForm.value['cards'] // causes cards to be removed this will be moved to its own component probably
    );
    if (this.editMode) {
      this.deckService.updateDeck(this.id,newDeck);
      this.subscription.add(null);
    } else {
      this.deckService.createDeck(this.deckForm.value);
    }
    this.onCancel();
  }

  goToOverview(){
      this.router.navigate(['view'], {relativeTo: this.route.parent});

  }

  // Dont use this
  onAddCardToDeck() {
    (<FormArray>this.deckForm.get('cards')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }
// dont use this either
  onDeleteCardFromDck(index: number) {
    (<FormArray>this.deckForm.get('cards')).removeAt(index);
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let deck2: Deck;
    let deckName ='';
    let deckMade_By = '';
    let deckDescription = '';
    let deckHero_type = '';
    /*let deckName = this.deck.name;
    let deckMade_By = this.deck.made_by;
    let deckDescription = this.deck.description;
    let deckHero_type = this.deck.hero_type;
    const deckCards = this.deck.cards; */
console.log('editmode zu true moeten zijn '+this.editMode);
    if (this.editMode) {
      this.deckService.getDeck(this.id.toString())
        .then(deck => this.deck = deck)
        .catch(error => console.log('editmode error'));
      deckName = this.deck.name;
      deckMade_By = this.deck.made_by;
      deckDescription = this.deck.description;
      deckHero_type = this.deck.hero_type;
    }else{
      console.log('geen edit mode');
    }

    this.deckForm = new FormGroup({
      'name': new FormControl(deckName),
      'made by': new FormControl(deckMade_By),
      'description': new FormControl(deckDescription),
      'hero': new FormControl(deckHero_type)
    });


  }

}

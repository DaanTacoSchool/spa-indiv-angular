import { Component, OnInit } from '@angular/core';
import {Deck} from "../deck.model";
import { FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule  } from '@angular/forms';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DeckService} from "../deck.service";
import {CardService} from "../../card/card.service";
import {Subscription} from "rxjs/Subscription";
import {Card} from "../../card/card.model";
import {UserService} from "../../shared/user.service";
import {User} from "../../shared/user.model";

@Component({
  selector: 'app-deck-edit',
  templateUrl: './deck-edit.component.html',
  styleUrls: ['./deck-edit.component.css']
})
export class DeckEditComponent implements OnInit {
  users: User[];
  id: string;
  cardid: string; // for when creating a deck from cardlist
  card: Card;
  editMode = false;
  deckForm: FormGroup;
  public deck: Deck;
  decks: Deck[];

  private subscription: Subscription;


  constructor(private route: ActivatedRoute,
              private deckService: DeckService,
              private cardService: CardService,
              private userService: UserService,
              private router: Router) {
    this.initForm();

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null; //  != null
          this.cardid = params['cardid'];
        });
    this.subscription = this.deckService.decksChanged
      .subscribe(
        (decks: Deck[]) => {
          this.decks = decks;
        }
      );
    if(this.id) {
      this.deckService.getDeck(this.id.toString())
        .then(deck => this.deck = deck)
        .catch(error => console.log('error in edit init' + error));
    }
    if(this.cardid) {
      console.log('card loaded');
      this.cardService.getCard(this.cardid.toString())
        .then(card => this.card = card)
        .catch(error => console.log('error in edit init' + error));
    }
    this.initForm();
  }

  onSubmit() {
    // check whether this is an edit or a kind of creation, make sure the right data is put through.
    let tmpId:string;
    if(this.id === 'new' || this.id==null){
      tmpId=null;
    }else{
      tmpId= this.id;
    }

    let tmpCards: Card[];
    if(tmpId){
      tmpCards=this.deck.cards;
    }else if(this.card){
      tmpCards=[this.card];
    }

    let tmpUserId: number;
    if( this.deckForm.value['user id']){
      tmpUserId =  this.deckForm.value['user id'];
    }else if(tmpId){
      tmpUserId= this.deck.userId;
    }else{
      tmpUserId=null;
    }
    console.log(tmpCards);
    const newDeck = new Deck(
     tmpId,
      this.deckForm.value['name'],
      this.deckForm.value['description'],
      this.deckForm.value['made by'],
      this.deckForm.value['hero'],
      tmpCards,
      tmpUserId

    );
    if (this.editMode) {
      this.deckService.updateDeck(this.id,newDeck);
     // this.subscript
    } else {
      this.deckService.createDeck(newDeck); // this.deckForm.value
    }
    this.onCancel();
  }

  goToOverview(){
    this.router.navigate(['../../../','view', this.id], {relativeTo: this.route});

  }



  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  searchUser(srch:string) {
    console.log('search users deckedit:' +srch);

    if (srch === '' || srch === 'search' || srch == null) {
    //get all and refresh
      console.log('get all' +srch);
    }else{
      //execute search
      this.userService.findUsers(srch).then((users) => {
      this.users = users;
      console.log(this.users+'usersssssssss');
      });
      console.log('search users end:' +srch);
    }
  }
  private initForm() {
    let deck2: Deck;
    let deckName ='';
    let deckMade_By = '';
    let deckDescription = '';
    let deckHero_type = '';
    let deckUserId = null;
    if (this.editMode) {
      this.deckService.getDeck(this.id.toString())
        .then(deck => { this.deck = deck;
          deckName = this.deck.name;
          deckMade_By = this.deck.made_by;
          deckDescription = this.deck.description;
          deckHero_type = this.deck.hero_type;
        deckUserId = this.deck.userId; })
        .catch(error => console.log(error));

    }else{
      console.log('creation mode');
    }

    // note! doesnt have ids or cards here so make sure to include them from other sources. this is because these things can be missing.
    this.deckForm = new FormGroup({
      'name': new FormControl(deckName),
      'made by': new FormControl(deckMade_By),
      'description': new FormControl(deckDescription),
      'hero': new FormControl(deckHero_type),
      'user id': new FormControl(deckUserId),
    });

  }

}

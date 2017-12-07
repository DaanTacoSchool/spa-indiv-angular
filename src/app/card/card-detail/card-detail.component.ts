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

  onAddToDeck() {
    // this.cardService.a(this.card);
    console.log('todo: add to deck');
  }



}

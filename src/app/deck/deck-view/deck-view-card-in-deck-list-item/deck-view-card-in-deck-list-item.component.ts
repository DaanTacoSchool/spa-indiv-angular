import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../../card/card.model";


@Component({
  selector: 'app-deck-view-card-in-deck-list-item',
  templateUrl: './deck-view-card-in-deck-list-item.component.html',
  styleUrls: ['./deck-view-card-in-deck-list-item.component.css']
})
export class DeckViewCardInDeckListItemComponent implements OnInit {
  @Input() card: Card;
  @Input() id: string;

  constructor() { }

  ngOnInit() {
  }



}

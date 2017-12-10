import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../../card/card.model";

@Component({
  selector: 'app-deck-view-card-item',
  templateUrl: './deck-view-card-item.component.html',
  styleUrls: ['./deck-view-card-item.component.css']
})
export class DeckViewCardItemComponent implements OnInit {
  @Input() card: Card;
  @Input() id: string;
  @Output() addToDeckEvent:EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addCardToDeck(cardId: string){
    console.log('decklistitem id:'+cardId);
    this.addToDeckEvent.emit(cardId);
  }
}

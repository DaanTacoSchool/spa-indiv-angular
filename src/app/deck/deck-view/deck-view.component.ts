import {Component, Input, OnInit} from '@angular/core';
import {Deck} from "../deck.model";

@Component({
  selector: 'app-deck-view',
  templateUrl: './deck-view.component.html',
  styleUrls: ['./deck-view.component.css']
})
export class DeckViewComponent implements OnInit {
  @Input() deck: Deck;
  @Input() index: string; // TODO: MAKE THIS string?
  constructor() { }

  ngOnInit() {
  }

}

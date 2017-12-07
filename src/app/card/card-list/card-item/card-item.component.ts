import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../card.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() card: Card;
  @Input() index: string; // TODO: MAKE THIS string?
  constructor() { }

  ngOnInit() {
  }

}

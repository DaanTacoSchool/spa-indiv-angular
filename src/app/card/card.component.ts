import {Component, OnInit, ViewChild} from '@angular/core';
import {CardListComponent} from "./card-list/card-list.component";
import {CardService} from "./card.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
search: string;
  constructor(private cardService: CardService) { }

  ngOnInit() {
  }
  @ViewChild(CardListComponent) cardList: CardListComponent;


  searchCard(srch:string) {

    if (srch === '' || srch === 'search' || srch == null) {
        this.cardService.getAllCards().then((cards) => {
          this.cardList.refresh(cards);
          });
    }else{
        this.cardService.findCard(srch).then((cards) => {
          this.cardList.refresh(cards);
          });
    }
  }
}

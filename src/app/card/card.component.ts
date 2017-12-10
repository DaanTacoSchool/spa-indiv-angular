import {Component, OnInit, ViewChild} from '@angular/core';
import {CardListComponent} from "./card-list/card-list.component";
import {CardService} from "./card.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private cardService: CardService) { }

  ngOnInit() {
  }
  @ViewChild(CardListComponent) cardList: CardListComponent;


  searchCard(srch:string){
    if(srch===''){
      this.cardService.getAllCards().then((cards)=> { this.cardList.refresh(cards);});
    }
    console.log(srch);
      this.cardService.findCard(srch).then((cards)=> { this.cardList.refresh(cards);});
  }
}

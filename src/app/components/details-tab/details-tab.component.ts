import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/services/model';

@Component({
  selector: 'app-details-tab',
  templateUrl: './details-tab.component.html',
  styleUrls: ['./details-tab.component.css']
})
export class DetailsTabComponent implements OnInit {

  @Input() game!: Game;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Game } from 'src/app/services/model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,OnDestroy {
  gameRating = 0;
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;
  gameId!: string;

  constructor(   
     private activatedRoute: ActivatedRoute,
    private httpService: ApiserviceService) { }
  ngOnDestroy(): void {
    if(this.gameSub)
    this.gameSub.unsubscribe();
    
    if(this.routeSub)
    this.routeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        console.log(this.game)
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }
}

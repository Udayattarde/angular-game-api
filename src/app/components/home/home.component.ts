import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { APIResponse, Game } from 'src/app/services/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  public sort!: string;;
  public games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(private httpService: ApiserviceService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
 

  ngOnInit(): void {
   this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }
  searchGames(sort: string, search?: string): void {
    this.httpService
      .getGameLists(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
      });
  }

  openGameDetails(id:number):void{
this.router.navigate(['details',id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
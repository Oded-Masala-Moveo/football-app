import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FetchFootballService } from '../services/fetch-football.service';
import { Leagues } from '../models/footballLeague.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-league-tabs',
  templateUrl: './league-tabs.component.html',
  styleUrls: ['./league-tabs.component.scss'],
})
export class LeagueTabsComponent {
  loadedLeague: Leagues[] = [];
  isFetching = false;
  private errorSub: Subscription;
  constructor(private leagueService: FetchFootballService) {}

  ngOnInit(): void {
    this.getLoadedLeague();
  }
  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  getLoadedLeague() {
    return this.leagueService.getLeagues().subscribe((data) => {
      this.isFetching = true;
      this.loadedLeague = data;
      console.log(this.loadedLeague);
      this.isFetching = false;
    });
  }
}

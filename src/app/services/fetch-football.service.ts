import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Leagues } from '../models/footballLeague.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FetchFootballService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  getLeagues = () => {
    const url = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';
    return this.http.get<{ [key: string]: Leagues[] }>(url).pipe(
      map((responseData) => {
        let leagueArray: Leagues[] = [];
        leagueArray = responseData.leagues.slice(0, 7);
        return leagueArray;
      })
    );
  };

  getTeamsInLeague = (leagueName: string) => {
    const editLeagueName = leagueName.replaceAll(' ', '_');
    const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${editLeagueName}`;
    return this.http.get(url);
    // .pipe(
    //   map((responseData) => {
    //     let leagueArray: Leagues[] = [];
    //     leagueArray = responseData.leagues.slice(0, 7);
    //     return leagueArray;
    //   })
    // );
  };
}

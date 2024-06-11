import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  apiUrl: string = 'http://localhost:3000/heroes'
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  getHero(slug: string | null): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}?slug=${slug}`)
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero)
  }

  editHero(id: string, hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/${id}`, hero)
  }

  deleteHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.apiUrl}/${id}`)
  }
}

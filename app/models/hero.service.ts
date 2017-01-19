
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService{

    private heroesUrl = 'api/heroes';

    constructor(private http: Http){}
    
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl).toPromise().then(
            response => response.json().data as Hero[]
        ).catch(
            this.handleError
        )
    };

    getHero(id: number): Promise<Hero>{
        const url = `${this.heroesUrl}/${id}`;

        return this.http.get(url).toPromise().then(
            response => response.json().data as Hero
        ).catch(
            this.handleError
        );
    };

    createHero(hero: Hero): Promise<Hero>{
        return this.http.post(this.heroesUrl, hero).toPromise().then(
            response => response.json().data
        ).catch(
            this.handleError
        );
    }

    updateHero(hero: Hero): Promise<Hero>{
        const url = `${this.heroesUrl}/${hero.id}`;

        return this.http.put(url, hero).toPromise().then(
            () => hero
        ).catch(
            this.handleError
        );
    };    

    deleteHero(id: number): Promise<void>{
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete(url).toPromise().then(
            () => null
        ).catch(
            this.handleError
        );
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: 'hero-search.component.html',
    styleUrls: [ 'hero-search.component.css' ],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit{
    
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(private router: Router, private heroSearchService: HeroSearchService){}

    // Push a search term into the observable stream
    search(term: string): void{
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
            .debounceTime(300) // wait for 300ms
            .distinctUntilChanged() // ignore if next search term is the same as the previous
            .switchMap(
                term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([])
            ).catch(
                error => {
                    console.log(error);
                    return Observable.of<Hero[]>([])
                }
            );
    }

    gotoDetail(hero: Hero): void{
        this.router.navigate(['/detail', hero.id]);
    }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './models/hero';
import { HeroService } from './models/hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css']
})
export class HeroesComponent implements OnInit { 

  heroes: Hero[];
  selectedHero: Hero;

  ngOnInit(): void{
    this.getHeroes();
  }

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
  }

  addHero(heroName: string): void{
    let newHero = new Hero(heroName.trim());

    if(newHero.name.length === 0){
      return;
    }else{
      this.heroService.createHero(newHero).then(
        hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        }
      )
    }
  }

  deleteHero(hero: Hero): void{
    this.heroService.deleteHero(hero.id).then(
      () => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if(this.selectedHero === hero){
          this.selectedHero = null;
        }
      }
    )
  }

  getHeroes(): void{
    this.heroService.getHeroes().then(
      heroes => this.heroes = heroes
    );
  }

  gotoDetail(): void{
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  constructor(private heroService: HeroService, private router: Router){}
}

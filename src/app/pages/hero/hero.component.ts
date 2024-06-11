import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { JsonPipe } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../interfaces/hero';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, JsonPipe, CapitalizePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  slug: string | null = '';
  hero: Hero = {} as Hero;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private heroesService: HeroesService,
  ) { }

  ngOnInit(): void {
    this.getHeroSlug();
    this.getHero();
  }

  public goToHomePage(): void {
    this.router.navigate(['/'])
  }

  private getHeroSlug(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
    });
  }

  private getHero(): void {
    this.heroesService.getHero(this.slug).subscribe({
      next: (res: Hero[]) => {
        this.hero = res[0];
      },
      error: (error: Error) => {
        this.notification.openSnackBar(error.message);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime } from 'rxjs';
import { Hero } from '../../interfaces/hero';
import { CardComponent } from '../../components/card/card.component';
import { NotificationService } from '../../services/notification.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CardComponent,
    LoadingComponent
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];
  search: string = '';
  searchSubject = new Subject<string>();
  showLoading: boolean = false;

  constructor(
    private router: Router,
    private heroesService: HeroesService,
    private notification: NotificationService,
  ) {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe((value: string) => {
      this.filteredHeroes = this.heroes.filter((f: Hero) => f.name.toLowerCase().includes(value.toLowerCase()));
    });
  }

  ngOnInit(): void {
    this.showLoading = true;
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroesService.getHeroes().subscribe({
      next: (res: Hero[]) => {
        this.heroes = res.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0
        })
        this.filteredHeroes = this.heroes;
        this.showLoading = false;
      },
      error: (error: Error) => {
        this.showLoading = false;
        this.notification.openSnackBar(error.message);
      }
    })
  }

  public navigateToCreate(): void {
    this.router.navigate(['/new'])
  }

  public onSearchChange(value: string) {
    this.searchSubject.next(value);
  }
}

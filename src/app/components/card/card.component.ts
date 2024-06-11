import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Hero } from '../../interfaces/hero';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { HeroesService } from '../../services/heroes.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, CapitalizePipe],
  providers: [CapitalizePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() hero: Hero = {} as Hero;
  @Output() onHeroDelete: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private dialog: MatDialog,
    private notification: NotificationService,
    private capitalizePipe: CapitalizePipe
  ) { }

  public navigateToEditHero(slug: string): void {
    this.router.navigate([`/${slug}/edit`])
  }

  public navigateToHero(slug: string): void {
    this.router.navigate([`/${slug}`])
  }

  public deleteHero(hero: Hero): void {
    const dialog = this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        title: 'Delete Hero',
        description: `Would you like to delete ${this.capitalizePipe.transform(hero.name)}?`
      }
    })

    dialog.afterClosed().subscribe((result: boolean) => {
      if (!result) return;
      this.heroesService.deleteHero(hero.id).subscribe({
        next: () => {
          const message = `${this.capitalizePipe.transform(hero.name)} deleted successfully`
          this.notification.openSnackBar(message);
          this.onHeroDelete.emit(true);
        },
        error: (error: Error) => {
          this.notification.openSnackBar(error.message)
        }
      })
    })
  }
}

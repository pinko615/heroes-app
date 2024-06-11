import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from '../../components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { Hero } from '../../interfaces/hero';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RANDOM_HERO_IMAGES } from '../../constants/random-hero-images';
import { HERO_FORM } from '../../constants/hero-form';
import { NotificationService } from '../../services/notification.service';
import { FormField } from '../../interfaces/form-field-base';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    CapitalizePipe
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    fullname: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    firstAppearance: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    publisher: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    work: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    slug: new FormControl('', Validators.maxLength(100)),
    imageUrl: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    powerstats: new FormGroup({
      intelligence: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      speed: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      power: new FormControl(0, [Validators.min(0), Validators.max(100)]),
      combat: new FormControl(0, [Validators.min(0), Validators.max(100)])
    })
  });
  slug: string | null = '';
  hero: Hero = {} as Hero;
  heroId: string = '';
  isEdition: boolean = false;
  randomImages: string[] = RANDOM_HERO_IMAGES;
  heroFormConfig: FormField[] = HERO_FORM;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroesService: HeroesService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getHeroSlug();
    this.getHero();
    this.controlNameValue();

  }

  public goToHomePage(): void {
    this.router.navigate(['/'])
  }

  public createHero(): void {
    this.setSlugValue();
    this.heroesService.createHero(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
        const message = 'Hero created successfully!'
        this.notification.openSnackBar(message);
      },
      error: (error: Error) => {
        this.notification.openSnackBar(error.message);
      }
    })
  }

  public editHero(): void {
    this.setSlugValue();
    this.heroesService.editHero(this.heroId, this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
        const message = 'Hero edited successfully!'
        this.notification.openSnackBar(message);
      },
      error: (error: Error) => {
        this.notification.openSnackBar(error.message);
      }
    })
  }

  public discardChanges(): void {
    if (this.form.pristine) {
      this.router.navigate(['/'])
    } else {
      const dialog = this.dialog.open(ModalComponent, {
        width: '500px',
        data: {
          title: 'Discard changes',
          description: 'Would you like to discard changes?'
        }
      })

      dialog.afterClosed().subscribe((result: boolean) => {
        if (!result) return;
        this.router.navigate(['/'])
      })
    }
  }

  public setRandomImage(): void {
    const randomIndex = Math.floor(Math.random() * this.randomImages.length)
    const baseUrl = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/${this.randomImages[randomIndex]}.jpg`
    this.form.patchValue({ imageUrl: baseUrl })
  }

  private getHeroSlug(): void {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.isEdition = !!this.slug;
    });
  }

  private getHero(): void {
    if (!this.slug) return;
    this.heroesService.getHero(this.slug).subscribe({
      next: (res: Hero[]) => {
        this.hero = res[0];
        this.form.patchValue(this.hero);
        this.heroId = this.hero.id;
      },
      error: (error: Error) => {
        this.notification.openSnackBar(error.message);
      }
    })
  }

  private controlNameValue(): void {
    this.form.get('name')?.valueChanges.subscribe((value: string) => {
      this.form.get('name')?.setValue(value.toUpperCase(), { emitEvent: false })
    })
  }

  private setSlugValue(): void {
    const slug = this.form.get('name')?.value.toLowerCase().split(' ').join('-');
    this.form.patchValue({ slug })
  }
}

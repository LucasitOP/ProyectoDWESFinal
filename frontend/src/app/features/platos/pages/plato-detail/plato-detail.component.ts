import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlatoService } from '../../services/plato.service';
import { Plato } from '../../../../shared/models/plato.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plato-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plato-detail.component.html'
})
export class PlatoDetailComponent implements OnInit {

  plato$: Observable<Plato> | undefined;

  constructor(
    private route: ActivatedRoute,
    private platoService: PlatoService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.plato$ = this.platoService.getPlato(Number(id));
    }
  }
}

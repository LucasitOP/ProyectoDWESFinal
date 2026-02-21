import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatoService } from '../../services/plato.service';
import { Plato } from '../../../../shared/models/plato.model';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-plato-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plato-list.component.html',
  styleUrl: './plato-list.component.css'
})
export class PlatoListComponent implements OnInit {

  platos$: Observable<Plato[]> | undefined;

  constructor(
    private platoService: PlatoService,
    public auth: AuthService // Para mostrar botones de admin si es necesario
  ) { }

  ngOnInit(): void {
    this.platos$ = this.platoService.getPlatos();
  }
}

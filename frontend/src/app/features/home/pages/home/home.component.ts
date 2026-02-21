import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  restaurants: Restaurant[] = [
    {
      id: 'restaurante-1',
      name: 'Restaurante Italiano',
      description: 'La mejor pasta fresca y pizzas al horno de leña.',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      rating: 4.8
    },
    {
      id: 'restaurante-2',
      name: 'Asador Argentino',
      description: 'Carnes a la parrilla con el auténtico sabor del sur.',
      image: 'https://images.unsplash.com/photo-1544025162-d76690b68f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
      rating: 4.5
    },
    {
      id: 'restaurante-3',
      name: 'Sushi Bar',
      description: 'Sushi fresco y creativo en un ambiente moderno.',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rating: 4.9
    }
  ];

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Ya no redirigimos automáticamente al dashboard para que puedan ver la lista de restaurantes
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  signup(): void {
    this.auth.loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup'
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}

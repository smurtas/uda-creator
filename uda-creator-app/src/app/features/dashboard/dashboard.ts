import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.ensureProfile();
  }

  async logout() {
    await this.authService.signOut();
    window.location.href = '/login';
  }
}

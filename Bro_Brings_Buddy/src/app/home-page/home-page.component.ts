import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home-page.component',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  private router = inject(Router)
  onLogOut() {
    const wantsToLogOut = window.confirm('Are you sure you want to log out?')

    if (wantsToLogOut) {
      this.router.navigate([''])
    }
  }
}

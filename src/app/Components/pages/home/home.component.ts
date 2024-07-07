import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  constructor(
    protected _authService: AuthService
  ) { }

  logout() {
    sessionStorage.clear();
    location.reload();
  }

  ngOnInit() {
    this._authService.getUser();
  }

}

import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent {

  user_str!: string | null;
  user_json!: any;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  isScrolled = false;

  toggle_menu() {
    const body = document.getElementById("navbar");
    if (body != null)
      body.classList.toggle("navbar-mobile");

    const elements = document.getElementsByClassName("mobile-nav-toggle");
    elements[0].classList.toggle('d-none');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  /**
   * Go to register page
   */
  go_to_register_page() {
    this._router.navigateByUrl('register');
  }

  /**
   * Go to login page
   */
  go_to_login_page() {
    this._router.navigateByUrl('login');
  }

  /**
   * Init user data to manage 
   */
  initUserData() {
    this.user_str = sessionStorage.getItem('familytree-user');
    if (this.user_str) {
      this.user_json = JSON.parse(this.user_str);

      // store user in auth service
      this._authService.user = this.user_json;

      console.log(this.user_json);
    }
  }

  logout() {
    // code ...
    sessionStorage.removeItem('familytree-user');
    this._router.navigateByUrl('/');
  }

  ngOnInit() {
    this.initUserData();
  }



}

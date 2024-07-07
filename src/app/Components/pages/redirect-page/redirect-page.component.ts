import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.css']
})
export class RedirectPageComponent {
  // variable d'association
  idAssociationMember!: number;

  // error state
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private _router: Router
  ) { }

  getParams() {
    // get idFamily from url
    let id_string = this.route.snapshot.paramMap.get('id');
    if (id_string)
      this.idAssociationMember = Number.parseInt(id_string);
    if (isNaN(this.idAssociationMember)) {
      this.hasError = true;
    } else {
      this.hasError = false;
    }
  }

  openApp() {
    const fallbackUrl = 'api/redirection/error';
    if (!this.hasError) {
      // const now = new Date().getTime();
      const openAppUrl = 'familytree://association?member=' + this.idAssociationMember;

      // setTimeout(() => {
      // if (new Date().getTime() - now < 1500) {
      // }
      // }, 1000);

      window.location.href = openAppUrl;
    } else {
      this._router.navigateByUrl(fallbackUrl);
      // window.location.href = fallbackUrl;
    }
  }

  ngOnInit() {
    // this.openApp();
    this.getParams();
  }
}

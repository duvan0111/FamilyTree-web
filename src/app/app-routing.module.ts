import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeUserComponent } from './Components/pages/home-user/home-user.component';
import { AuthComponent } from './Components/pages/auth/auth.component';
import { HomeFamilyComponent } from './Components/pages/home-family/home-family.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { DetailFamilyComponent } from './Components/pages/detail-family/detail-family.component';
import { FamilyTreeComponent } from './Components/pages/family-tree/family-tree.component';
import { ShowTreeFromMobileComponent } from './Components/pages/show-tree-from-mobile/show-tree-from-mobile.component';
import { RedirectPageComponent } from './Components/pages/redirect-page/redirect-page.component';
import { ErrorRedirectPageComponent } from './Components/pages/error-redirect-page/error-redirect-page.component';

const routes: Routes = [
  // 
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: HomeComponent, title: "Accueil" },
  { path: 'authentification', component: AuthComponent, title: "Authentification" },
  {
    path: 'home', component: HomeUserComponent, title: "FamilyTree", children: [
      { path: 'family', component: HomeFamilyComponent },
      { path: 'family/detail', component: DetailFamilyComponent },
      { path: 'family/tree', component: FamilyTreeComponent },
      // GET /api/families/:id/tree
    ]
  },
  { path: 'api/families/:id/tree/:token', component: ShowTreeFromMobileComponent },
  { path: 'api/join/families/association/:id', component: RedirectPageComponent },
  { path: 'api/redirection/error', component: ErrorRedirectPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

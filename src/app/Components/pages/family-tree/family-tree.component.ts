import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { FamilyService } from 'src/app/Services/Family/family.service';
import FamilyTree from "src/assets/balkanapp/familytree";


@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent {

  constructor(
    protected _router: Router,
    private _familyService: FamilyService,
    private _authService: AuthService,
    private _notifierService: NotifierService
  ) { }

  isLoading = false;
  familyTree: any = [
    { id: 1, pids: [2], name: "Amber McKenzie", gender: "female", img: "https://cdn.balkan.app/shared/2.jpg" },
    { id: 2, pids: [1], name: "Ava Field", gender: "male", img: "https://cdn.balkan.app/shared/m30/5.jpg" },
    { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male", img: "https://cdn.balkan.app/shared/m10/2.jpg" },
    { id: 4, mid: 1, fid: 2, name: "Savin Stevens", gender: "male", img: "https://cdn.balkan.app/shared/m10/1.jpg" },
    { id: 5, mid: 1, fid: 2, name: "Emma Stevens", gender: "female", img: "https://cdn.balkan.app/shared/w10/3.jpg" }
  ];

  getFamilyTree() {
    // try {
    //   // start loader
    //   this.isLoading = true;
    //   this._familyService.getFamilyTree(this._familyService.currentFamily.id, this._authService.user.token).pipe(
    //     catchError((error: HttpErrorResponse) => {
    //       this.isLoading = false;
    //       if (error.status !== 200) {
    //         // display error
    //         this._notifierService.notify('error', 'Une erreur est survenue.');
    //         console.error(error);
    //       }
    //       return throwError(error);
    //     })
    //   ).subscribe(response => {

    //     // log
    //     console.log(response);

    //     this.familyTree = response.data;

    //     // call parser
    //     this.familyTreeParser();
    //   });
    // } catch (error) {

    // }
  }

  familyTreeParser() {
    // code ...

    // chargement du graph
    const tree_default = document.getElementById('tree');
    const tree_fulllscreen = document.getElementById('fullscreen-tree');

    this.laodTree(tree_default, this.familyTree);
    this.laodTree(tree_fulllscreen, this.familyTree);

    //stop laoder
    this.isLoading = false;
  }

  laodTree(tree: HTMLElement | null, data: any) {
    if (tree) {
      var family = new FamilyTree(tree, {
        nodeBinding: {
          field_0: "name",
          img_0: "img"
        }, mode: "dark",
      });

      family.load(data);
    }
  }

  ngOnInit() {
    this.getFamilyTree();
    const tree_default = document.getElementById('tree');
    const tree_fulllscreen = document.getElementById('fullscreen-tree');
    
    this.laodTree(tree_default, this.familyTree);
    this.laodTree(tree_fulllscreen, this.familyTree);
  }
}

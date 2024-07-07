import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { FamilyService } from 'src/app/Services/Family/family.service';
import FamilyTree from 'src/assets/balkanapp/familytree';

@Component({
  selector: 'app-show-tree-from-mobile',
  templateUrl: './show-tree-from-mobile.component.html',
  styleUrls: ['./show-tree-from-mobile.component.css']
})
export class ShowTreeFromMobileComponent {
  id!: string | null;
  token!: string | null;
  familyName!: string;
  isLoading = false;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private _familyService: FamilyService,
  ) { }


  familyTree: any = [
    { id: 1, pids: [2], name: "Amber McKenzie", gender: "female", img: "https://cdn.balkan.app/shared/2.jpg" },
    { id: 2, pids: [1], name: "Ava Field", gender: "male", img: "https://cdn.balkan.app/shared/m30/5.jpg" },
    { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male", img: "https://cdn.balkan.app/shared/m10/2.jpg" },
    { id: 4, mid: 1, fid: 2, name: "Savin Stevens", gender: "male", img: "https://cdn.balkan.app/shared/m10/1.jpg" },
    { id: 5, mid: 1, fid: 2, name: "Emma Stevens", gender: "female", img: "https://cdn.balkan.app/shared/w10/3.jpg" }
  ];

  /**
   * get family to display name - ok
   * @param idFamily 
   * @param token 
   */
  getFamily(idFamily: number, token: string) {
    try {
      this.isLoading = true;
      this._familyService.getById(idFamily, token).pipe(
        catchError((error: HttpErrorResponse) => {
          this.isLoading = false;
          if (error.status !== 200) {
            // display error
            this.hasError = true;
            console.error(error);
          }
          return throwError(error);
        })
      ).subscribe(res => {
        // set family name
        this.familyName = res.name;
      });
    } catch (error) {

    }
  }

  getFamilyTree(idFamily: number, token: string) {
    if (this.id && this.token) {
      try {
        // start loader
        this.isLoading = true;

        // send request to get family tree
        this._familyService.getFamilyTree(idFamily, token).pipe(
          catchError((error: HttpErrorResponse) => {
            this.isLoading = false;
            if (error.status !== 200) {
              // display error
              this.hasError = true;
              console.error(error);
            }
            return throwError(error);
          })
        ).subscribe(response => {

          // log
          console.log(response);

          this.familyTree = response;

          // call parser
          this.familyTreeParser();
        });
      } catch (error) {

      }
    } else {

    }

  }

  familyTreeParser() {
    // code ...

    // chargement du graph
    const tree_fulllscreen = document.getElementById('tree');

    // this.laodTree(tree_default, this.familyTree);
    this.loadTree(tree_fulllscreen, this.familyTree);

    //stop laoder
    this.isLoading = false;
  }

  loadTree(tree: HTMLElement | null, data: any) {
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
    // get idFamily from url
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');

    let idFamily!: number;

    if (this.id && this.token) {
      idFamily = Number.parseInt(this.id);

      // get name of family
      this.getFamily(idFamily, this.token);

      // get family tree
      this.getFamilyTree(idFamily, this.token);

    } else {
      this.hasError = true;
    }

    // const tree_fulllscreen = document.getElementById('tree');

    // // this.laodTree(tree_default, this.familyTree);
    // this.loadTree(tree_fulllscreen, this.familyTree);

  }
}

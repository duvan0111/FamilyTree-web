import { Component } from '@angular/core';
import { Router } from '@angular/router';
import FamilyTree from "src/assets/balkanapp/familytree";


@Component({
  selector: 'app-family-tree',
  templateUrl: './family-tree.component.html',
  styleUrls: ['./family-tree.component.css']
})
export class FamilyTreeComponent {

  constructor(
    protected _router: Router
  ) { }

  laodTree(tree: HTMLElement | null) {
    if (tree) {
      var family = new FamilyTree(tree, {
        nodeBinding: {
          field_0: "name",
          img_0: "img"
        }, mode: "dark",
      });

      family.load([
        { id: 1, pids: [2], name: "Amber McKenzie", gender: "female", img: "https://cdn.balkan.app/shared/2.jpg" },
        { id: 2, pids: [1], name: "Ava Field", gender: "male", img: "https://cdn.balkan.app/shared/m30/5.jpg" },
        { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male", img: "https://cdn.balkan.app/shared/m10/2.jpg" },
        { id: 4, mid: 1, fid: 2, name: "Savin Stevens", gender: "male", img: "https://cdn.balkan.app/shared/m10/1.jpg" },
        { id: 5, mid: 1, fid: 2, name: "Emma Stevens", gender: "female", img: "https://cdn.balkan.app/shared/w10/3.jpg" }
      ]);
    }
  }

  ngOnInit() {
    const tree_default = document.getElementById('tree');
    const tree_fulllscreen = document.getElementById('fullscreen-tree');

    this.laodTree(tree_default);
    this.laodTree(tree_fulllscreen);

  }
}

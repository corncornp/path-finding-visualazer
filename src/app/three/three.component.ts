import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import * as THREE from 'three'
@Component({
  standalone: true,
  template: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {}

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {
  private three = THREE;
  constructor() { 
    this.three = THREE
  }

  ngOnInit(): void {
  } 

}

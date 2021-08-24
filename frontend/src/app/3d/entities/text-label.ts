// NOT USED ANYMORE

// import * as THREE from 'three';
// import { Entity } from '../entity';

// export class TextLabel extends Entity {
//     private htmlElement: HTMLElement;
//     private position: THREE.Vector3 = new THREE.Vector3;

//     // TODO implement a smart way to signal which text labels must 
//     // be updated to avoid recalculating screen space coordinates all the time.
//     private needsUpdate: boolean = true;

//     constructor(
//         public htmlContainer: HTMLElement,
//         public parent: THREE.Object3D,
//         public camera: THREE.Camera
//     ) {
//         super();
//     }
    
//     init() {
//         this.htmlElement = document.createElement('div');
//         this.htmlElement.style.position = 'absolute';
//         this.htmlElement.className='text-label';
//         this.htmlContainer.appendChild(this.htmlElement);
//         this.updatePosition();
//         this.setText('Hello');
//     }

//     setText(text: string) {
//         this.htmlElement.innerHTML = text;
//     }

//     get2DCoordinates(): THREE.Vector2 {
//         const projectedCoords = this.position.project(this.camera);
//         return new THREE.Vector2(
//             (projectedCoords.x + 1) * window.innerWidth / 2,
//             - (projectedCoords.y - 1) * window.innerHeight / 2,
//         );
//     }

//     updatePosition() {
//         if (this.parent != null) {
//             this.position.copy(this.parent.position);

//             const screenSpaceCoords = this.get2DCoordinates();
//             this.htmlElement.style.left = screenSpaceCoords.x + 'px';
//             this.htmlElement.style.top = screenSpaceCoords.y + 'px';
//         }
//     }

//     update() {
//         if (this.needsUpdate) {
//             this.updatePosition();
//         }
//     }
// }
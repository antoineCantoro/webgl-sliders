import { Program, Mesh, Texture } from 'ogl';

export default class Media { 
  constructor({
    element,
    gl,
    scene,
    geometry,
    index,
    screen,
    viewport
  }) {
    this.element = element;
    this.gl = gl;
    this.scene = scene;
    this.geometry = geometry;
    this.index = index;
    this.screen = screen;
    this.viewport = viewport;

    this.createMesh()
    this.createBounds()

    this.onResize()
  }

  // Creates

  createMesh() {
    this.mesh = new Mesh(gl, {
      geometry: this.geometry,
      program: this.program,
    });
  }

  createBounds() {
    this.bounds = 'bounds';
  }


  // Events

  onResize() {

  }

  onUpdate() {
    console.log('update');
  }
}

//     const program = new Program(gl, {
//         vertex: /* glsl */ `
//             attribute vec3 position;

//             uniform mat4 modelViewMatrix;
//             uniform mat4 projectionMatrix;

//             void main() {
//                 gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//             }
//         `,
//         fragment: /* glsl */ `
//             void main() {
//                 gl_FragColor = vec4(1.0);
//             }
//         `,
//     });

//     const mesh = new Mesh(gl, { geometry, program });
//     mesh.setParent(scene);
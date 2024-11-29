import { Program, Mesh, Texture } from 'ogl';
import vertexShader from '../Shaders/vertex.glsl';
import fragmentShader from '../Shaders/fragment.glsl';

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
    
    this.createProgram()
    this.createMesh()
    // this.createBounds()

    this.onResize()
  }

  // Creates

  createProgram() {
    const texture = new Texture(this.gl);
    texture.image = this.element;    

    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uScreenSizes: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        uTime: { value: 0 },
      },
    });
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
      wireframe: true,
    });
    
    this.mesh.setParent(this.scene);
  }

  createBounds() {
    this.bounds = 'bounds';
  }

  // Setup

  setScale() {
    // this.mesh.scale.x = this.viewport.width;
    // this.mesh.scale.y = this.viewport.height;
  }

  setPositionX() {
    // this.mesh.position.x = this.index * this.viewport.width;
  }

  setPositionY() {
    // this.mesh.position.y = this.index * this.viewport.height;
  }


  // Events
  onResize() {
    
  }

  onUpdate() {
    // console.log('update');
  }
}
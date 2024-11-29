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
    length,
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
    this.length = length;

    this.extra = 0
    
    this.createProgram()
    this.createMesh()
    this.createBounds()

    this.onResize()
  }

  // Creates

  createProgram() {
    const texture = new Texture(this.gl, {
      generateMipmaps: false
    });

    texture.image = this.element;    

    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [this.element.naturalWidth, this.element.naturalHeight] },
        uViewportSizes: { value: [this.viewport.width, this.viewport.height] },
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
  onResize({ screen, viewport } = {}) {
    if (screen) {
      this.screen = screen
    }
    if (viewport) {
      this.viewport = viewport
      this.mesh.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height]
    }

    // Set original scale

    this.scale = this.screen.height / 1500

    this.mesh.scale.y = this.viewport.height * (960 * this.scale) / this.screen.height
    this.mesh.scale.x = this.viewport.width * (640 * this.scale) / this.screen.width    
   
    this.mesh.program.uniforms.uPlaneSizes.value = [this.mesh.scale.x, this.mesh.scale.y]


    // Set original positions
    this.padding = 0.2
    this.width = this.mesh.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index

    console.log(this.x);
    
  }

  onUpdate(scroll, direction) {
    this.mesh.position.x = this.x - scroll * 0.5 - this.extra

    const planeOffset = this.mesh.scale.x / 2
    const viewportOffset = this.viewport.width
   
    this.isBefore = this.mesh.position.x + planeOffset < -viewportOffset
    this.isAfter = this.mesh.position.x - planeOffset > viewportOffset
   
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
   
      this.isBefore = false
      this.isAfter = false
    }
   
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
   
      this.isBefore = false
      this.isAfter = false
    }
  }
}
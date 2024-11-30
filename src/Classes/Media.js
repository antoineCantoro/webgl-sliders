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
        uVelocity: { value: 0 },
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

  setPositionX(direction) {
    const planeOffset = this.mesh.scale.x / 2
    const viewportOffset = this.viewport.width    
   
    this.isBefore = this.mesh.position.x + planeOffset < -viewportOffset
    this.isAfter = this.mesh.position.x - planeOffset > viewportOffset

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.sliderTotalWidth
   
      this.isBefore = false
      this.isAfter = false
    }
   
    if (direction === 'left' && this.isAfter) {
      this.extra += this.sliderTotalWidth
   
      this.isBefore = false
      this.isAfter = false
    }
  }

  setPositionY() {
    // this.mesh.position.y = this.index * this.viewport.height;
    // this.mesh.position.y = -this.viewport.height / 2 + this.mesh.scale.y - this.padding;
  }

  setScale() {
    const distanceFromCenter = Math.abs(1 - this.mesh.position.x - this.mesh.scale.x / 2)
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

    this.scale = this.screen.height / 1800

    this.initialScale = {
      x: this.viewport.width * (640 * this.scale) / this.screen.width,
      y: this.viewport.height * (960 * this.scale) / this.screen.height
    }

    this.mesh.scale.y = this.initialScale.y
    this.mesh.scale.x = this.initialScale.x
   
    this.mesh.program.uniforms.uPlaneSizes.value = [this.mesh.scale.x, this.mesh.scale.y]

    this.distance = 3

    // this.mesh.position.x = Math.cos(this.viewport.width / this.index) * 2
    // this.mesh.position.y = -Math.sin(this.viewport.width / this.index) * 2


    // Set original positions
    // this.padding = 0.2
    // this.mediaTotalWidth = this.mesh.scale.x + this.padding
    // this.sliderTotalWidth = this.mediaTotalWidth * this.length
    // this.x = this.mediaTotalWidth * this.index

  }

  onUpdate(scroll, direction) {
    this.setScale()

    // this.mesh.position.x = this.x - scroll.current * 0.5 - this.extra

    this.mesh.position.x = Math.cos(scroll.current / 6 + 2 * Math.PI / this.length * this.index ) * this.distance
    this.mesh.position.z = Math.sin(scroll.current / 6 + 2 * Math.PI / this.length * this.index ) * this.distance - this.distance

    // this.mesh.rotation.y = -Math.PI / 2 + scroll.current + 2 * Math.PI / this.length * this.index
    this.mesh.rotation.y = this.mesh.position.x * 0.1 * Math.PI
    // this.mesh.rotation.x = scroll.current * this.index
    // this.mesh.rotation.y = scroll.current * this.index * this.length
    this.program.uniforms.uVelocity.value = scroll.velocity
   
    this.setPositionX(direction)
    this.setPositionY()
  }
}
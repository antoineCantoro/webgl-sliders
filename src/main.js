import './style.scss'
import { Renderer, Camera, Transform, Box, Plane, Program, Mesh } from 'ogl';
import normalizeWheel from 'normalize-wheel';

// {

//     function resize() {
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         camera.perspective({
//             aspect: gl.canvas.width / gl.canvas.height,
//         });
//     }
//     window.addEventListener('resize', resize, false);
//     resize();

//     const scene = new Transform();

//     const geometry = new Box(gl);





//     requestAnimationFrame(update);
//     function update(t) {
//         requestAnimationFrame(update);

//         mesh.rotation.y -= 0.04;
//         mesh.rotation.x += 0.03;

//         renderer.render({ scene, camera });
//     }
// }


const imageSrcs = [
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
];

const images = [];

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
}

Promise.all(imageSrcs.map(loadImage)).then((images) => {
  console.log(images);
})

class App {
  constructor() {
    this.screenSizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.createPlaneGeometry()

    this.addEvents()
    this.onResize()
    this.update()
  }

  // Creates

  createRenderer() {
    this.renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });
    this.gl = this.renderer.gl;
    
    this.gl.clearColor(0, 1, 1, .1);

    // this.renderer.c
    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new Transform();
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }

  createPlaneGeometry() {
    this.geometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  createMedias() {
    // this.medias
  }

  // Events


  onMouseWheel(event) {
    const normalized = normalizeWheel(event);
    console.log(normalized.pixelY);
    
  }

  onResize() {
    this.screenSizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.renderer.setSize(this.screenSizes.width, this.screenSizes.height);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });
  }


  addEvents() {
    document.addEventListener('mousewheel', this.onMouseWheel.bind(this));

    window.addEventListener('resize', this.onResize.bind(this), false);
  }

  // Update

  update() {
    window.requestAnimationFrame(this.update.bind(this));
    // console.log('update');

    if (this.medias) {
      this.medias.forEach(media => {
        media.onUpdate();
      });
    }
    
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
}

const app = new App();
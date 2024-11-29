import './style.scss'
import { lerp } from './Utils/lerp';
import { Renderer, Camera, Transform, Plane } from 'ogl';
import normalizeWheel from 'normalize-wheel';
import Media from './Classes/Media';

const imageSrcs = [
  '/images/1.webp',
  '/images/2.webp',
  '/images/3.webp',
  '/images/4.webp',
  '/images/5.webp',
  '/images/6.webp',
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
  const app = new App(images);
})

class App {
  constructor(images) {
    this.images = images;

    this.screenSizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.viewport = {
      height: 0,
      width: 0
    }

    this.mouse = {
      current: 0,
      target: 0,
      easing: 0.1,
    }    

    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.createPlaneGeometry()
    this.createMedias()

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

    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.z = 5;
    this.camera.fov = 45; 
  }

  createScene() {
    this.scene = new Transform();
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }

  createPlaneGeometry() {
    this.geometry = new Plane(this.gl, {
      heightSegments: 2,
      widthSegments: 2
    });
  }

  createMedias() {

    this.medias = this.images.map((image, index) => {
      
      let media = new Media({
        element: image,
        gl: this.gl,
        geometry: this.geometry,
        index: index,
        total: this.images.length,
        viewport: this.viewport,
        scene: this.scene,
        camera: this.camera
      });

      return media;
    })
  }

  // Events
  onMouseWheel(event) {
    const normalized = normalizeWheel(event);
    this.mouse.target += normalized.pixelY * 0.005
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

    this.viewport = {
      height: 2 * Math.tan(this.camera.fov * Math.PI / 180 / 2) * this.camera.position.z,
      width: this.gl.canvas.width
    }

    if (this.medias) {
      this.medias.forEach(media => {
        media.onResize();
      });
    }
  }


  addEvents() {
    window.addEventListener('resize', this.onResize.bind(this), false);
    window.addEventListener('mousewheel', this.onMouseWheel.bind(this));
    window.addEventListener('wheel', this.onMouseWheel.bind(this));
  }

  // Update
  update() {    
    this.mouse.current = lerp(this.mouse.current, this.mouse.target, this.mouse.easing);

    if (this.medias) {
      this.medias.forEach(media => {
        media.onUpdate();
      });
    }
    
    this.renderer.render({ scene: this.scene, camera: this.camera });
    window.requestAnimationFrame(this.update.bind(this));
  }
}
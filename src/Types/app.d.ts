type AppCursor = {
  x: number;
  y: number;
};

interface AppScreen {
  width: number;
  height: number;
};

interface AppViewport {
  width: number;
  height: number;
};

interface AppScroll {
  current: number,
  target: number,
  last: number,
  easing: number,
};

type OGLRenderingContext = (WebGL2RenderingContext | WebGLRenderingContext) & {
  renderer: Renderer;
  canvas: HTMLCanvasElement;
};
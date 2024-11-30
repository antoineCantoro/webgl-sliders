precision mediump float;

attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform vec2 uViewportSizes;
uniform vec2 uPlaneSizes;

uniform float uVelocity;

varying vec2 vUv;

void main() {
  vUv = uv;
  
  vec3 newPos = position;

  // newPos.z += 2.0 * cos(newPos.x - vUv.x - 0.5);
  // newPos.z += 12.0 * sin(vUv.x);

  // newPos.y -= uViewportSizes.y / 2.0;
  // newPos.y += uPlaneSizes.y / 2.0;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
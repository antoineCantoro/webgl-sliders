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
  // newPos.x -= cos(uv.y);
  // newPos.y = -cos(uv.x);
  // newPos.x *= 0.5;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
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
  vec2 st = vec2(vUv.x, vUv.y);
  float pct = 0.0;
  pct = distance(st,vec2(0.5));
  // newPos.z += sin(uVelocity * vUv.x) - 0.5;
  newPos.z -= pct * abs(uVelocity);
  newPos.x -= pct * uVelocity * 0.1;
  newPos.y -= pct * uVelocity * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
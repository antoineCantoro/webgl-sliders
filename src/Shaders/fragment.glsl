precision mediump float;

uniform float uProgress;
uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;
uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  vec2 newUv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec2 centeredUv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec2 zoomedUv = (centeredUv - 0.5) * 1.0 * (1.0 - abs(uProgress) * 0.5) + 0.5;

  vec2 parallaxUv = zoomedUv;
  parallaxUv.x -= uProgress / 8.0; // Décalage horizontal
  // parallaxUv.y += uProgress / 4.0;
  // parallaxUv = clamp(parallaxUv, 0.0, 1.0);

  // newUv *= 0.8;
  // newUv.x -= uProgress / 2.0;
  
  gl_FragColor.rgb = texture2D(uTexture, parallaxUv).rgb;
  gl_FragColor.a = 1.0;
}
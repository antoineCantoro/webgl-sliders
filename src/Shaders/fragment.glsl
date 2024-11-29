precision mediump float;

uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  gl_FragColor.rgb = texture2D(uTexture, vUv).rgb;
  gl_FragColor.a = 1.0;
}
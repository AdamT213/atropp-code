window.onload = main;

function main() {
  const canvas = document.querySelector('#glcanvas');
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.autoClearColor = false;

  const camera = new THREE.OrthographicCamera(
    -1, // left
     1, // right
     1, // top
    -1, // bottom
    -1, // near,
     1, // far
  );
  const scene = new THREE.Scene();
  const plane = new THREE.PlaneBufferGeometry(2, 2);

  const fragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define M_PI 3.1415926535897932384626433832795

float rand(vec2 co)
{
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main()
{
vec2 position = gl_FragCoord.xy / resolution.xy;
position.y *= resolution.y/resolution.x;
float size = 30.0;
float prob = 0.85;
vec2 vpos = position;
  vpos.x += vpos.x;
  vpos.y += vpos.y * time;

vec2 pos = floor(1.0 / size * gl_FragCoord.xy);

float color = 0.0;
float starValue = rand(pos);

if (rand(gl_FragCoord.xy / resolution.xy) > 0.996)
{
  float r = rand(gl_FragCoord.xy);
  color = r * (0.85 * sin(time * (r * 5.0) + 720.0 * r) + 0.95);
}

//gl_FragColor.rgb += min(1.0, max(0.0, 4.0-length(fract(vpos))/size));
gl_FragColor = vec4(vec3(color),1.0);
}
`;
  const uniforms = {
    time: { value: 0 },
    resolution:  { value: new THREE.Vector3() },
  };
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms,
  });
  scene.add(new THREE.Mesh(plane, material));

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;  // convert to seconds

    resizeRendererToDisplaySize(renderer);

    const canvas = renderer.domElement;
    uniforms.resolution.value.set(canvas.width, canvas.height, 1);
    uniforms.time.value = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
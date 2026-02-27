import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { CSG } from 'three-bvh-csg';
// import { SUBTRACTION, Evaluator, Brush } from 'three-bvh-csg';

// Create a scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x202020); // dark grey
// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000);
camera.position.set(20, 20, 20);
// Create a renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(2.5, 2.5, 0);
controls.update();

// Create a mesh and add it to the scene

let widthInput = document.getElementById('width');
let heightInput = document.getElementById('height');
let depthInput = document.getElementById('depth');
let angle1Input = document.getElementById('alpha');
let angle2Input = document.getElementById('beta');
let updateBtn = document.getElementById('updateBtn');

// const width = parseFloat(widthInput.value);
// const height = parseFloat(heightInput.value);
// const depth = parseFloat(depthInput.value);
// const angle1 = parseFloat(angle1Input.value);
// const angle2 = parseFloat(angle2Input.value);

// const geometry = createAngledBlock(width,height,depth,angle1,angle2);




// const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

// console.log(geometry);


// const angle = 30;
// const slope = Math.tan(THREE.MathUtils.degToRad(angle));

// for (let i = 0; i < position.count; i++) {
//     const x = position.getX(i);
//     const y = position.getY(i);
//     const z = position.getZ(i);

//     if(Math.abs(z - depth) < 0.001) {
//         const newZ = z+y*slope;
//         position.setZ(i, newZ);
//     }
// }

// position.needsUpdate = true;

// geometry.computeVertexNormals();

// Clipping Plane

// const clippingPlane= new THREE.Plane(new THREE.Vector3(0,0.5,1).normalize(),-2);

// const material = new THREE.MeshNormalMaterial({
//     side: THREE.DoubleSide,
//     // clippingPlanes: [clippingPlane],
//     // clipShadows: true,
// });

// renderer.localClippingEnabled = true;



// scene.add(mesh);

// CSG

// const baseBrush = new Brush(geometry);
// baseBrush.updateMatrixWorld();

// const cutterGeometry = new THREE.BoxGeometry(10, 10, 10);

// const cutterBrush = new Brush(cutterGeometry);

// cutterBrush.position.set(3, 0, 0);

// cutterBrush.rotation.z = Math.PI/3;
// cutterBrush.rotation.z = THREE.MathUtils.degToRad(35);

// cutterBrush.updateMatrixWorld();

// const evaluator = new Evaluator();
// const result = evaluator.evaluate(baseBrush, cutterBrush, SUBTRACTION);

const material = new THREE.MeshNormalMaterial();
// const mesh = new THREE.Mesh(geometry,material);

function createAngledBlock(x,y,z,angle1,angle2){

    const alpha = angle1 * (Math.PI / 180);
    const beta = angle2 * (Math.PI / 180);

    const leftOffset = y * Math.tan(alpha);
    const rightOffset = y * Math.tan(beta);

    if(leftOffset+rightOffset >= x){
        alert("Angles are too much compared to width !!!")
        return;
    }

    const shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(x,0);
    shape.lineTo(x-rightOffset,y);
    shape.lineTo(leftOffset,y);
    shape.closePath();

    const extrudeSettings = {
        depth: z,
        bevelEnabled: false,

    };

    return new THREE.ExtrudeGeometry(shape,extrudeSettings);

}

let mesh;

function buildMesh(){
    const width = parseFloat(widthInput.value);
    const height = parseFloat(heightInput.value);
    const depth = parseFloat(depthInput.value);
    const alpha = parseFloat(angle1Input.value);
    const beta = parseFloat(angle2Input.value);

    const geometry = createAngledBlock(width,height,depth,alpha,beta);

    if(mesh){
        scene.remove(mesh);
    }

    mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
}

buildMesh();

updateBtn.addEventListener("click" , buildMesh);
// scene.add(mesh);

// result.material = new THREE.MeshNormalMaterial();
// scene.add(result);

// Add a grid helper
const gridHelper = new THREE.GridHelper(40, 40);
scene.add(gridHelper);

// Add axes helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);


// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// console.log(geometry.attributes.position.array);
/* Base */
const canvas = document.querySelector('canvas.webgl')

/* Scene */
const scene = new THREE.Scene()

/* Test Cube 
const cubeGeometry = new THREE.BoxGeometry(1,1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const cube = new THREE.Mesh(
    cubeGeometry, cubeMaterial
)
scene.add(cube)
*/

/*  GLTF Loader */
let billboard = null;

const gltfLoader = new THREE.GLTFLoader()
gltfLoader.load(
    '../asset/donut/scene.gltf', 
    (gltf) => {
        billboard = gltf.scene;

        billboard.position.x = 1.5
        billboard.rotation.x = Math.PI * 0.2 
        billboard.rotation.z = Math.PI * 0.15


        const radius = 8.5
        billboard.scale.set(radius, radius, radius)
        scene.add(billboard)
    })

/* Sizes */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/* Camera */
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

/* Light */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(1, 2, 0)
scene.add(directionalLight)

/* Renderer */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/* Animate */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    if(!!billboard){
        billboard.position.y = Math.sin(elapsedTime * 0.5) * 0.1 - 0.1
    }


    console.log('tick')
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()
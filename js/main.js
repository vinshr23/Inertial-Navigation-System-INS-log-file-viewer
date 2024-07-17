import * as THREE from './three.js';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';
import insData from './insData.js';

document.addEventListener("DOMContentLoaded", function() {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Add a sky background
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
        'textures/sky.jpg',
        function (texture) {
            scene.background = texture;
        },
        undefined,
        function (err) {
            console.error('Error loading sky texture', err);
        }
    );

    // Add ground with grass texture
    textureLoader.load(
        'textures/grass.jpg',
        function (texture) {
            texture.wrapS = THREE.RepeatWrapping; // repeat horizontally
            texture.wrapT = THREE.RepeatWrapping; // repeat vertically
            texture.repeat.set(180, 180); // Adjust repeat values as needed

            const groundMaterial = new THREE.MeshBasicMaterial({ map: texture });

            // Create a large plane to act as the ground with the grass texture
            const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
            const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
            groundMesh.rotation.x = -Math.PI / 2; // Rotate to lay flat on the ground
            scene.add(groundMesh);
        },
        undefined,
        function (err) {
            console.error('Error loading grass texture', err);
        }
    );

    // Add axes helper
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // Set up camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; //vertical rotation 

    // Position the camera
    camera.position.set(100, 100, 100);
    controls.update();

    // Add ambient light(i.e, make equal light on each object)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    scene.add(ambientLight);

    // Add directional light(sun like light creates shadow)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 100, 100).normalize();
    scene.add(directionalLight);

    // Load the Airplane model
    let airplane;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        'models/Airplane.glb',
        function (gltf) {
            airplane = gltf.scene;
            scene.add(airplane);

            // Optionally adjust scale, position, and rotation of the airplane model
            airplane.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed
            airplane.position.set(0, 10, 0); // Adjust position as needed
            airplane.rotation.set(0, Math.PI, 0); // Adjust rotation as needed
        },
        function (progressEvent) {
            console.log('Loading progress', progressEvent);
        },
        function (error) {
            console.error('Error loading model', error);
        }
    );

    // Create coordinates points from insData 
    const points = insData.map(data => {
        const { latitude: x, altitude: y, longitude: z } = data.coordinates;
        return new THREE.Vector3(x, y / 100, z); // Scaling altitude to fit the grid
    });

    // Create yellow line connecting all coordinate points
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 }); // Yellow color
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const yellowLine = new THREE.Line(lineGeometry, lineMaterial);
    yellowLine.visible = false; // Make the yellow line invisible
    scene.add(yellowLine);

    // Create yellow spheres for each coordinate point
    points.forEach(point => {
        const sphereGeometry = new THREE.SphereGeometry(0.3, 8, 8); // Adjust radius for smaller yellow spheres
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow color
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.copy(point);
        scene.add(sphere);
    });

    // Create white points for each accelerometer data point
    const whitePoints = insData.map(data => {
        const { latitude, longitude, altitude } = data.coordinates;
        const { x, y, z } = data.accel;

        // Create white material for points and line
        const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        // Create a sphere geometry for the point with a smaller radius
        const sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8); // Adjust radius and segments as needed
        const sphere = new THREE.Mesh(sphereGeometry, whiteMaterial);

        // Position the sphere relative to the coordinates
        sphere.position.set(latitude, altitude / 100, longitude); // Adjust position based on your coordinate system

        // Move the sphere according to accelerometer data
        sphere.position.x += x;
        sphere.position.y += y;
        sphere.position.z += z;

        // Add the sphere to the scene
        scene.add(sphere);

        return sphere.position.clone(); // Return the position for white line creation
    });

    // Create white line connecting all white points
    const whiteLineMaterial = new THREE.LineBasicMaterial({ color: 0xb8255f });
    const whiteLineGeometry = new THREE.BufferGeometry().setFromPoints(whitePoints);
    const whiteLine = new THREE.Line(whiteLineGeometry, whiteLineMaterial);
    scene.add(whiteLine);

    // Calculate the path length and segment lengths for animation
    const pathLength = whitePoints.reduce((acc, point, i) => {
        if (i > 0) {
            const prevPoint = whitePoints[i - 1];
            const segmentLength = point.distanceTo(prevPoint);
            acc.totalLength += segmentLength;
            acc.segmentLengths.push(segmentLength);
        }
        return acc;
    }, { totalLength: 0, segmentLengths: [] });

    let startTime = null; // Track start time for animation
    const speed = 25000 / 3600; // 25000 km/hr converted to km/sec
    let isAnimating = false;

    // Create an animation loop to render the scene
    function animate(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        if (isAnimating && airplane) {
            const elapsedTime = timestamp - startTime;
            const distanceTraveled = speed * elapsedTime / 1000; // Convert elapsedTime to seconds

            if (distanceTraveled <= pathLength.totalLength) {
                let accumulatedDistance = 0;
                for (let i = 1; i < whitePoints.length; i++) {
                    accumulatedDistance += pathLength.segmentLengths[i - 1];
                    if (accumulatedDistance >= distanceTraveled) {
                        const segmentStart = whitePoints[i - 1];
                        const segmentEnd = whitePoints[i];
                        const segmentRatio = (distanceTraveled - (accumulatedDistance - pathLength.segmentLengths[i - 1])) / pathLength.segmentLengths[i - 1];
                        const accelerometerData = insData[i - 1].accel;

                        // Calculate adjusted position based on accelerometer data
                        const adjustedPosition = new THREE.Vector3(
                            segmentStart.x + accelerometerData.x,
                            segmentStart.y + accelerometerData.y,
                            segmentStart.z + accelerometerData.z
                        );

                        // Move the airplane using linear interpolation
                        airplane.position.lerpVectors(adjustedPosition, segmentEnd, segmentRatio);

                        // Calculate start and end rotation quaternions
                        const startGyro = insData[i - 1].gyro;
                        const endGyro = insData[i].gyro;

                        const startQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(startGyro.x, startGyro.y, startGyro.z));
                        const endQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(endGyro.x, endGyro.y, endGyro.z));

                        // Slerp quaternion for smooth orientation change
                        airplane.quaternion.slerpQuaternions(startQuaternion, endQuaternion, segmentRatio);

                        break;
                    }
                }
            } else {
                // Stop the animation once the airplane reaches the end of the path
                isAnimating = false;
                document.getElementById('startStopButton').textContent = 'Start';
            }
        }

        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    animate(performance.now());

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Start/Stop button functionality
    const startStopButton = document.getElementById('startStopButton');
    startStopButton.addEventListener('click', () => {
        isAnimating = !isAnimating;
        if (isAnimating) {
            startTime = null; // Reset start time on restart
            animate(performance.now()); // Start animation loop
            startStopButton.textContent = 'Stop';
        } else {
            startStopButton.textContent = 'Start';
        }
    });

    // Restart button functionality
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        isAnimating = true;
        startTime = null; // Reset start time on restart
        animate(performance.now()); // Start animation loop
        startStopButton.textContent = 'Stop';
    });
});

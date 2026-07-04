import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Type definitions
interface GraterConfig {
    bodyWidth: number;
    bodyHeight: number;
    bodyDepth: number;
    handleLength: number;
    legCount: number;
}

class Grater3D {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private graterGroup: THREE.Group;
    
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x222222);
        
        this.initCamera();
        this.initRenderer();
        this.initControls();
        this.initLights();
        this.buildGrater();
        this.animate();
    }
    
    private initCamera(): void {
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.set(3, 2.5, 4.5);
        this.camera.lookAt(0, 0.3, 0);
    }
    
    private initRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        document.body.appendChild(this.renderer.domElement);
        
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    private initControls(): void {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0.3, 0);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.autoRotate = false;
        this.controls.update();
    }
    
    private initLights(): void {
        // Ambient light
        const ambient = new THREE.AmbientLight(0x404060, 0.5);
        this.scene.add(ambient);
        
        // Key light
        const keyLight = new THREE.DirectionalLight(0xffeedd, 2.0);
        keyLight.position.set(2, 5, 3);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        this.scene.add(keyLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0xccddff, 0.8);
        fillLight.position.set(-3, 1, -2);
        this.scene.add(fillLight);
        
        // Rim light
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
        rimLight.position.set(-1, 0.5, -4);
        this.scene.add(rimLight);
        
        // Hemisphere light
        const hemiLight = new THREE.HemisphereLight(0x446688, 0x222222, 0.6);
        this.scene.add(hemiLight);
    }
    
    private buildGrater(): void {
        this.graterGroup = new THREE.Group();
        
        // Materials
        const metalMaterial = new THREE.MeshStandardMaterial({
            color: 0xc0c8d0,
            roughness: 0.35,
            metalness: 0.85
        });
        
        const darkMetalMaterial = new THREE.MeshStandardMaterial({
            color: 0x889098,
            roughness: 0.4,
            metalness: 0.8
        });
        
        const handleMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a2c1b,
            roughness: 0.7,
            metalness: 0.1
        });
        
        const handleCapMaterial = new THREE.MeshStandardMaterial({
            color: 0x5a4c3b,
            roughness: 0.6,
            metalness: 0.2
        });
        
        const legMaterial = new THREE.MeshStandardMaterial({
            color: 0x9aa2aa,
            roughness: 0.4,
            metalness: 0.7
        });
        
        // Body (trapezoid)
        const bodyGeo = new THREE.CylinderGeometry(0.9, 1.1, 1.4, 4);
        const body = new THREE.Mesh(bodyGeo, metalMaterial);
        body.rotation.y = Math.PI / 4;
        body.castShadow = true;
        body.receiveShadow = true;
        this.graterGroup.add(body);
        
        // Grating panel
        const panelMat = new THREE.MeshStandardMaterial({
            color: 0xb0b8c0,
            roughness: 0.5,
            metalness: 0.7
        });
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.45, 0.03), panelMat);
        panel.position.set(0, 0.05, 0.95);
        panel.castShadow = true;
        panel.receiveShadow = true;
        this.graterGroup.add(panel);
        
        // Holes
        const bumpMat = new THREE.MeshStandardMaterial({
            color: 0x889098,
            roughness: 0.3,
            metalness: 0.8
        });
        
        const holePositions: [number, number][] = [
            [-0.2, 0.1], [0.0, 0.1], [0.2, 0.1],
            [-0.2, -0.05], [0.0, -0.05], [0.2, -0.05],
            [-0.2, -0.2], [0.0, -0.2], [0.2, -0.2]
        ];
        
        holePositions.forEach(([x, y]) => {
            const hole = new THREE.Mesh(
                new THREE.SphereGeometry(0.04 + Math.random() * 0.04, 6, 6),
                bumpMat
            );
            hole.position.set(x, y + 0.05, 0.98);
            hole.scale.set(1, 1, 0.3);
            hole.castShadow = true;
            this.graterGroup.add(hole);
        });
        
        // Handle
        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.18, 0.18, 0.55, 12),
            handleMaterial
        );
        handle.rotation.x = Math.PI / 2;
        handle.position.set(0, 0.45, 1.2);
        handle.castShadow = true;
        handle.receiveShadow = true;
        this.graterGroup.add(handle);
        
        // Handle cap
        const cap = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 10, 10),
            handleCapMaterial
        );
        cap.position.set(0, 0.45, 1.48);
        cap.scale.set(1, 1, 0.6);
        cap.castShadow = true;
        cap.receiveShadow = true;
        this.graterGroup.add(cap);
        
        // Handle ring
        const ring = new THREE.Mesh(
            new THREE.CylinderGeometry(0.22, 0.25, 0.06, 12),
            darkMetalMaterial
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(0, 0.45, 0.95);
        ring.castShadow = true;
        ring.receiveShadow = true;
        this.graterGroup.add(ring);
        
        // Legs
        const legPositions: [number, number, number][] = [
            [-0.7, -0.55, -0.6],
            [0.7, -0.55, -0.6],
            [-0.7, -0.55, 0.6],
            [0.7, -0.55, 0.6]
        ];
        
        legPositions.forEach(([x, y, z]) => {
            const leg = new THREE.Mesh(
                new THREE.CylinderGeometry(0.08, 0.1, 0.2, 6),
                legMaterial
            );
            leg.position.set(x, y - 0.7, z);
            leg.castShadow = true;
            leg.receiveShadow = true;
            this.graterGroup.add(leg);
            
            const pad = new THREE.Mesh(
                new THREE.CylinderGeometry(0.12, 0.08, 0.04, 6),
                new THREE.MeshStandardMaterial({ color: 0x556066, roughness: 0.6, metalness: 0.3 })
            );
            pad.position.set(x, y - 0.82, z);
            pad.castShadow = true;
            pad.receiveShadow = true;
            this.graterGroup.add(pad);
        });
        
        // Add ridges
        const ridgeMat = new THREE.MeshStandardMaterial({
            color: 0xaab2ba,
            roughness: 0.5,
            metalness: 0.6
        });
        
        // Vertical ridges
        for (let i = -0.6; i <= 0.6; i += 0.3) {
            if (Math.abs(i) < 0.01) continue;
            
            const ridge = new THREE.Mesh(
                new THREE.BoxGeometry(0.02, 0.9, 0.02),
                ridgeMat
            );
            ridge.position.set(i, 0, 0.7);
            this.graterGroup.add(ridge);
            
            const ridgeBack = new THREE.Mesh(
                new THREE.BoxGeometry(0.02, 0.9, 0.02),
                ridgeMat
            );
            ridgeBack.position.set(i, 0, -0.7);
            this.graterGroup.add(ridgeBack);
        }
        
        // Horizontal ridges
        for (let y = -0.4; y <= 0.4; y += 0.25) {
            const ridgeH = new THREE.Mesh(
                new THREE.BoxGeometry(0.7, 0.02, 0.02),
                ridgeMat
            );
            ridgeH.position.set(0, y, 0.7);
            this.graterGroup.add(ridgeH);
            
            const ridgeHBack = new THREE.Mesh(
                new THREE.BoxGeometry(0.7, 0.02, 0.02),
                ridgeMat
            );
            ridgeHBack.position.set(0, y, -0.7);
            this.graterGroup.add(ridgeHBack);
        }
        
        // Position the grater
        this.graterGroup.position.y = 0.3;
        this.scene.add(this.graterGroup);
        
        // Add ground
        const groundGeo = new THREE.PlaneGeometry(6, 6);
        const groundMat = new THREE.ShadowMaterial({
            opacity: 0.3,
            color: 0x000000
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.55;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    
    private animate(): void {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const grater = new Grater3D();
    console.log('Three.js Grater initialized!');
});

// Export for module usage
export { Grater3D };

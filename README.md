# Three.js Grater - 3D Reconstruction

A 3D recreation of a real-world grater using Three.js. This project demonstrates how to build complex 3D objects from primitive geometries with realistic materials and lighting.

## Features

- **Accurate 3D Reconstruction**: Detailed grater model with body, handle, grating surface, legs, and surface textures
- **Interactive Controls**: Orbit controls for rotation, panning, and zooming
- **Realistic Materials**: Metal and plastic materials with proper roughness and metalness
- **Dynamic Lighting**: Multi-light setup with shadows for realistic rendering
- **Responsive**: Adapts to window size changes
- **Self-contained**: Single HTML file with all dependencies loaded from CDN

## Technologies Used

- [Three.js](https://threejs.org/) (r160) - 3D rendering library
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) - Interactive camera controls
- ES Modules - Modern JavaScript module system

## How to Run

1. **Option 1: Direct Open**
   - Save the HTML file locally
   - Open in any modern web browser
   - No server required (CDN loads dependencies)

2. **Option 2: Local Server** (recommended for development)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```
   Then open `http://localhost:8000` in your browser

3. **Option 3: Live Server** (VS Code)
   - Install "Live Server" extension
   - Right-click HTML file → "Open with Live Server"

## Controls

| Action | Control |
|--------|---------|
| Rotate | Click and drag |
| Zoom | Scroll wheel or pinch |
| Pan | Right-click and drag |

## Model Details

The grater model includes:
- **Main Body**: Trapezoidal prism with realistic proportions
- **Grating Surface**: Recessed panel with hole details
- **Handle**: Cylindrical grip with end cap and base ring
- **Legs**: Four metal supports with foot pads
- **Surface Details**: Vertical and horizontal ridges for texture

### Material Properties
- **Body**: Metal finish (roughness: 0.35, metalness: 0.85)
- **Handle**: Wood-like plastic (roughness: 0.7, metalness: 0.1)
- **Grating Surface**: Polished metal (roughness: 0.5, metalness: 0.7)

## Technical Implementation

### Geometry Construction
```javascript
// Example: Creating the trapezoidal body
const bodyGeo = new THREE.CylinderGeometry(0.9, 1.1, 1.4, 4);
const body = new THREE.Mesh(bodyGeo, metalMaterial);
body.rotation.y = Math.PI / 4;
```

### Lighting Setup
- **Ambient**: Soft fill light (0x404060, intensity 0.5)
- **Key Light**: Warm directional from front-right (intensity 2.0)
- **Fill Light**: Cool directional from back-left (intensity 0.8)
- **Rim Light**: Behind the object (intensity 0.6)
- **Hemisphere Light**: Environmental fill (intensity 0.6)

## Customization

### Adjusting Materials
```javascript
// Modify metal appearance
metalMaterial.roughness = 0.2;  // More reflective
metalMaterial.metalness = 0.9;   // More metallic
```

### Changing Colors
```javascript
// Body color (hex values)
const metalMaterial = new THREE.MeshStandardMaterial({
    color: 0xc0c8d0,  // Silver-grey
    // ...
});
```

### Camera Position
```javascript
// Adjust initial view
camera.position.set(3, 2.5, 4.5);
camera.lookAt(0, 0.3, 0);
```

## Browser Compatibility

Works on all modern browsers that support:
- ES Modules
- WebGL 2.0
- ES6+ JavaScript

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Polygon Count**: Optimized with low-poly geometries
- **Shadows**: Enabled with moderate shadow map size (1024x1024)
- **Antialiasing**: Enabled for smooth edges
- **Pixel Ratio**: Limited to 2x for performance

## Development Notes

### Adding New Features
1. **New geometries**:
   ```javascript
   const myMesh = new THREE.Mesh(
       new THREE.BoxGeometry(width, height, depth),
       material
   );
   grater.add(myMesh);
   ```

2. **New materials**:
   ```javascript
   const customMat = new THREE.MeshStandardMaterial({
       color: 0xff6600,
       roughness: 0.5,
       metalness: 0.3,
       emissive: 0x330000
   });
   ```

3. **Animation** (if needed):
   ```javascript
   function animate() {
       requestAnimationFrame(animate);
       grater.rotation.y += 0.01; // Slow rotation
       renderer.render(scene, camera);
   }
   ```

## Troubleshooting

### Black Screen
- Check console for errors (F12)
- Verify internet connection (CDN loading)
- Try using a different browser

### Performance Issues
- Reduce shadow map size: `keyLight.shadow.mapSize.width = 512;`
- Disable shadows: `renderer.shadowMap.enabled = false;`
- Reduce pixel ratio: `renderer.setPixelRatio(1);`

### Model Not Showing
- Adjust camera position to view the object
- Check that you're not looking from inside the model
- Verify object scale isn't too small/large

## Future Enhancements

- [ ] Add more detailed grating patterns
- [ ] Include texture maps for realistic surfaces
- [ ] Add environment map for reflections
- [ ] Implement model loading from external files
- [ ] Add multiple grater styles
- [ ] Include measurements/size indicators

## License

This project is open-source and available under the MIT License.

## Credits

- **Three.js**: [https://threejs.org](https://threejs.org)
- **OrbitControls**: [https://threejs.org/docs/#examples/en/controls/OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)

## Contact

For questions or suggestions, please open an issue or submit a pull request.

---

**Note**: This is a 3D reconstruction based on visual reference, not an exact CAD model. Proportions and details are approximated for visual fidelity.
```

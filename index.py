import numpy as np
import pyvista as pv
from pyvista import themes

def create_grater():
    # Create plotter
    plotter = pv.Plotter(window_size=[800, 600])
    plotter.set_background('darkgrey')
    
    # Materials (colors)
    metal_color = [0.75, 0.78, 0.82]  # RGB
    dark_metal = [0.53, 0.56, 0.60]
    handle_color = [0.23, 0.17, 0.11]
    handle_cap_color = [0.35, 0.30, 0.23]
    
    # Create body (trapezoid using cylinder with 4 sides)
    body = pv.Cylinder(radius=(0.9, 1.1), height=1.4, direction=(0, 1, 0), 
                       center=(0, 0, 0), resolution=4)
    body = body.rotate_y(45, inplace=False)
    plotter.add_mesh(body, color=metal_color, smooth_shading=True, 
                     specular=0.5, specular_power=50, roughness=0.35)
    
    # Grating panel
    panel = pv.Box(bounds=(-0.375, 0.375, -0.225, 0.225, 0.935, 0.965))
    plotter.add_mesh(panel, color=[0.69, 0.72, 0.75], smooth_shading=True)
    
    # Holes (spheres)
    hole_positions = [
        [-0.2, 0.1, 0.98], [0.0, 0.1, 0.98], [0.2, 0.1, 0.98],
        [-0.2, -0.05, 0.98], [0.0, -0.05, 0.98], [0.2, -0.05, 0.98],
        [-0.2, -0.2, 0.98], [0.0, -0.2, 0.98], [0.2, -0.2, 0.98]
    ]
    
    for pos in hole_positions:
        hole = pv.Sphere(radius=0.04, center=pos)
        hole = hole.scale([1, 1, 0.3])
        plotter.add_mesh(hole, color=dark_metal, smooth_shading=True)
    
    # Handle (cylinder)
    handle = pv.Cylinder(radius=0.18, height=0.55, direction=(0, 0, 1),
                         center=(0, 0.45, 1.2))
    plotter.add_mesh(handle, color=handle_color, smooth_shading=True,
                     specular=0.2, specular_power=20)
    
    # Handle cap (sphere)
    cap = pv.Sphere(radius=0.2, center=(0, 0.45, 1.48))
    cap = cap.scale([1, 1, 0.6])
    plotter.add_mesh(cap, color=handle_cap_color, smooth_shading=True)
    
    # Handle ring
    ring = pv.Cylinder(radius=(0.25, 0.22), height=0.06, direction=(0, 0, 1),
                       center=(0, 0.45, 0.95))
    plotter.add_mesh(ring, color=dark_metal, smooth_shading=True)
    
    # Legs
    leg_positions = [
        [-0.7, -0.55, -0.6],
        [0.7, -0.55, -0.6],
        [-0.7, -0.55, 0.6],
        [0.7, -0.55, 0.6]
    ]
    
    for pos in leg_positions:
        leg = pv.Cylinder(radius=(0.1, 0.08), height=0.2, direction=(0, -1, 0),
                          center=(pos[0], pos[1], pos[2]))
        plotter.add_mesh(leg, color=[0.60, 0.64, 0.67], smooth_shading=True)
        
        # Foot pad
        pad = pv.Cylinder(radius=(0.12, 0.08), height=0.04, direction=(0, -1, 0),
                          center=(pos[0], pos[1] - 0.12, pos[2]))
        plotter.add_mesh(pad, color=[0.33, 0.38, 0.40], smooth_shading=True)
    
    # Add ridges (simplified)
    for i in np.arange(-0.6, 0.7, 0.3):
        if abs(i) < 0.01:
            continue
        ridge = pv.Box(bounds=(i-0.01, i+0.01, -0.45, 0.45, 0.69, 0.71))
        plotter.add_mesh(ridge, color=[0.67, 0.70, 0.73], smooth_shading=True)
        
        ridge_back = pv.Box(bounds=(i-0.01, i+0.01, -0.45, 0.45, -0.71, -0.69))
        plotter.add_mesh(ridge_back, color=[0.67, 0.70, 0.73], smooth_shading=True)
    
    # Horizontal ridges
    for y in np.arange(-0.4, 0.5, 0.25):
        ridge_h = pv.Box(bounds=(-0.35, 0.35, y-0.01, y+0.01, 0.69, 0.71))
        plotter.add_mesh(ridge_h, color=[0.67, 0.70, 0.73], smooth_shading=True)
        
        ridge_h_back = pv.Box(bounds=(-0.35, 0.35, y-0.01, y+0.01, -0.71, -0.69))
        plotter.add_mesh(ridge_h_back, color=[0.67, 0.70, 0.73], smooth_shading=True)
    
    # Setup camera and lights
    plotter.camera_position = [(3, 2.5, 4.5), (0, 0.3, 0), (0, 1, 0)]
    plotter.enable_shadows()
    
    # Add lights
    plotter.add_light(pv.Light(position=(2, 5, 3), intensity=2.0, 
                               light_type='scene light', color='warm'))
    plotter.add_light(pv.Light(position=(-3, 1, -2), intensity=0.8, 
                               light_type='scene light', color='cool'))
    
    # Show plot
    plotter.show_grid(color='lightgrey', grid=True)
    plotter.show()
    
    return plotter

if __name__ == "__main__":
    create_grater()

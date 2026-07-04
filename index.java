import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.PerspectiveCamera;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.scene.paint.PhongMaterial;
import javafx.scene.shape.*;
import javafx.scene.transform.Rotate;
import javafx.stage.Stage;
import javafx.scene.PointLight;
import javafx.scene.AmbientLight;
import javafx.scene.layout.StackPane;

public class Grater3D extends Application {
    
    private static final double WIDTH = 800;
    private static final double HEIGHT = 600;
    
    @Override
    public void start(Stage primaryStage) {
        // Create root group
        Group root = new Group();
        
        // Create camera
        PerspectiveCamera camera = new PerspectiveCamera(true);
        camera.setTranslateX(-3);
        camera.setTranslateY(-2);
        camera.setTranslateZ(-5);
        camera.setFieldOfView(30);
        
        // Create scene
        Scene scene = new Scene(root, WIDTH, HEIGHT, true);
        scene.setFill(Color.DARKGRAY);
        scene.setCamera(camera);
        
        // Create lights
        AmbientLight ambientLight = new AmbientLight(Color.rgb(64, 64, 96, 0.5));
        root.getChildren().add(ambientLight);
        
        PointLight keyLight = new PointLight(Color.rgb(255, 238, 220));
        keyLight.setTranslateX(2);
        keyLight.setTranslateY(5);
        keyLight.setTranslateZ(3);
        root.getChildren().add(keyLight);
        
        PointLight fillLight = new PointLight(Color.rgb(204, 221, 255));
        fillLight.setTranslateX(-3);
        fillLight.setTranslateY(1);
        fillLight.setTranslateZ(-2);
        root.getChildren().add(fillLight);
        
        // Create grater group
        Group grater = new Group();
        grater.setTranslateY(0.3);
        
        // Materials
        PhongMaterial metalMaterial = new PhongMaterial();
        metalMaterial.setDiffuseColor(Color.rgb(192, 200, 208));
        metalMaterial.setSpecularColor(Color.rgb(255, 255, 255));
        metalMaterial.setSpecularPower(50.0);
        
        PhongMaterial darkMetalMaterial = new PhongMaterial();
        darkMetalMaterial.setDiffuseColor(Color.rgb(136, 144, 152));
        darkMetalMaterial.setSpecularColor(Color.rgb(200, 200, 200));
        darkMetalMaterial.setSpecularPower(40.0);
        
        PhongMaterial handleMaterial = new PhongMaterial();
        handleMaterial.setDiffuseColor(Color.rgb(58, 44, 27));
        handleMaterial.setSpecularColor(Color.rgb(100, 80, 60));
        handleMaterial.setSpecularPower(20.0);
        
        PhongMaterial handleCapMaterial = new PhongMaterial();
        handleCapMaterial.setDiffuseColor(Color.rgb(90, 76, 59));
        handleCapMaterial.setSpecularColor(Color.rgb(120, 100, 80));
        handleCapMaterial.setSpecularPower(25.0);
        
        // Body (trapezoid using Cylinder with 4 sides)
        Cylinder body = new Cylinder(0.9, 1.1, 1.4);
        body.setMaterial(metalMaterial);
        body.setRotationAxis(Rotate.Y_AXIS);
        body.setRotate(45);
        body.setTranslateX(0);
        body.setTranslateY(0);
        body.setTranslateZ(0);
        grater.getChildren().add(body);
        
        // Grating panel
        Box panel = new Box(0.75, 0.45, 0.03);
        PhongMaterial panelMaterial = new PhongMaterial(Color.rgb(176, 184, 192));
        panel.setMaterial(panelMaterial);
        panel.setTranslateX(0);
        panel.setTranslateY(0.05);
        panel.setTranslateZ(0.95);
        grater.getChildren().add(panel);
        
        // Grating holes
        PhongMaterial bumpMaterial = new PhongMaterial(Color.rgb(136, 144, 152));
        double[][] holePositions = {
            {-0.2, 0.1}, {0.0, 0.1}, {0.2, 0.1},
            {-0.2, -0.05}, {0.0, -0.05}, {0.2, -0.05},
            {-0.2, -0.2}, {0.0, -0.2}, {0.2, -0.2}
        };
        
        for (double[] pos : holePositions) {
            Sphere hole = new Sphere(0.04);
            hole.setMaterial(bumpMaterial);
            hole.setTranslateX(pos[0]);
            hole.setTranslateY(pos[1] + 0.05);
            hole.setTranslateZ(0.98);
            hole.setScaleX(1);
            hole.setScaleY(1);
            hole.setScaleZ(0.3);
            grater.getChildren().add(hole);
        }
        
        // Handle
        Cylinder handle = new Cylinder(0.18, 0.18, 0.55);
        handle.setMaterial(handleMaterial);
        handle.setRotationAxis(Rotate.X_AXIS);
        handle.setRotate(90);
        handle.setTranslateX(0);
        handle.setTranslateY(0.45);
        handle.setTranslateZ(1.2);
        grater.getChildren().add(handle);
        
        // Handle cap
        Sphere cap = new Sphere(0.2);
        cap.setMaterial(handleCapMaterial);
        cap.setTranslateX(0);
        cap.setTranslateY(0.45);
        cap.setTranslateZ(1.48);
        cap.setScaleX(1);
        cap.setScaleY(1);
        cap.setScaleZ(0.6);
        grater.getChildren().add(cap);
        
        // Handle ring
        Cylinder ring = new Cylinder(0.22, 0.25, 0.06);
        ring.setMaterial(darkMetalMaterial);
        ring.setRotationAxis(Rotate.X_AXIS);
        ring.setRotate(90);
        ring.setTranslateX(0);
        ring.setTranslateY(0.45);
        ring.setTranslateZ(0.95);
        grater.getChildren().add(ring);
        
        // Legs
        PhongMaterial legMaterial = new PhongMaterial(Color.rgb(154, 162, 170));
        double[][] legPositions = {
            {-0.7, -0.55, -0.6},
            {0.7, -0.55, -0.6},
            {-0.7, -0.55, 0.6},
            {0.7, -0.55, 0.6}
        };
        
        for (double[] pos : legPositions) {
            Cylinder leg = new Cylinder(0.08, 0.1, 0.2);
            leg.setMaterial(legMaterial);
            leg.setTranslateX(pos[0]);
            leg.setTranslateY(pos[1] - 0.7);
            leg.setTranslateZ(pos[2]);
            grater.getChildren().add(leg);
            
            // Foot pad
            Cylinder pad = new Cylinder(0.12, 0.08, 0.04);
            PhongMaterial padMaterial = new PhongMaterial(Color.rgb(85, 96, 102));
            pad.setMaterial(padMaterial);
            pad.setTranslateX(pos[0]);
            pad.setTranslateY(pos[1] - 0.82);
            pad.setTranslateZ(pos[2]);
            grater.getChildren().add(pad);
        }
        
        // Add ridges
        PhongMaterial ridgeMaterial = new PhongMaterial(Color.rgb(170, 178, 186));
        for (double i = -0.6; i <= 0.6; i += 0.3) {
            if (Math.abs(i) < 0.01) continue;
            
            Box ridge = new Box(0.02, 0.9, 0.02);
            ridge.setMaterial(ridgeMaterial);
            ridge.setTranslateX(i);
            ridge.setTranslateY(0);
            ridge.setTranslateZ(0.7);
            grater.getChildren().add(ridge);
            
            Box ridgeBack = new Box(0.02, 0.9, 0.02);
            ridgeBack.setMaterial(ridgeMaterial);
            ridgeBack.setTranslateX(i);
            ridgeBack.setTranslateY(0);
            ridgeBack.setTranslateZ(-0.7);
            grater.getChildren().add(ridgeBack);
        }
        
        // Add horizontal ridges
        for (double y = -0.4; y <= 0.4; y += 0.25) {
            Box ridgeH = new Box(0.7, 0.02, 0.02);
            ridgeH.setMaterial(ridgeMaterial);
            ridgeH.setTranslateX(0);
            ridgeH.setTranslateY(y);
            ridgeH.setTranslateZ(0.7);
            grater.getChildren().add(ridgeH);
            
            Box ridgeHBack = new Box(0.7, 0.02, 0.02);
            ridgeHBack.setMaterial(ridgeMaterial);
            ridgeHBack.setTranslateX(0);
            ridgeHBack.setTranslateY(y);
            ridgeHBack.setTranslateZ(-0.7);
            grater.getChildren().add(ridgeHBack);
        }
        
        // Add grater to scene
        root.getChildren().add(grater);
        
        // Setup stage
        primaryStage.setTitle("3D Grater - JavaFX");
        primaryStage.setScene(scene);
        primaryStage.show();
    }
    
    public static void main(String[] args) {
        launch(args);
    }
}

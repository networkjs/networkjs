import { GraphOptions } from "./api/GraphOptions"
import { Vertex } from "./core/Vertex"
import * as Commons from "./core/Commons"
import { VertexOptions } from "./api/VertexOptions"
import { VertexDelegate } from "./pixi/VertexDelegate"
import * as DRAW from "./pixi/VertexDrawers"

export class Networkjs {

    private _options: GraphOptions;
    constructor(options: GraphOptions) {
        this._options = options;
    }

    public start() {
        let renderer = new PIXI.WebGLRenderer(this._options.width, this._options.height, {
            antialias: true,
            transparent: true,
            resolution: 1
        });

        document.querySelector('#graph').appendChild(renderer.view);

        let registry = DRAW.DrawersRegistry.getInstance();
        registry.registerDrawer(VertexOptions.ShapeType.CIRCLE, DRAW.circleDrawer);
        registry.registerDrawer(VertexOptions.ShapeType.RECTANGLE, DRAW.rectangleDrawer);
        registry.registerDrawer(VertexOptions.ShapeType.TRIANGLE, DRAW.triangleDrawer);
        registry.registerDrawer(VertexOptions.ShapeType.ELLIPSE, DRAW.ellipseDrawer);

        let v1 = new Vertex({
            id: '1',
            label: 'Node A',
            position : {
                x: 100,
                y: 100
            },
            shapeOptions: {
                type: 'circle',
                options: {
                    radius: 20
                }
        }});
        let v2 = new Vertex({
            id: '2',
            label: 'Node B',
            position : {
                x: 50,
                y: 50
            },
            shapeOptions: {
                type: 'ellipse',
                options: {
                    width: 40,
                    height: 15,
                }
        }});

        let vd1 = new VertexDelegate(v1);
        let vd2 = new VertexDelegate(v2);

        v1.draw();
        v2.draw();

        let vertexStage = new PIXI.Container();
        let dobj1 = vd1.getDisplayObject();
        let dobj2 = vd2.getDisplayObject();

        vertexStage.addChild(dobj1);
        vertexStage.addChild(dobj2);
        renderer.render(vertexStage);

        v1.move({ x: 10, y: 20 });
        v1.rotate(1.5708);
        renderer.render(vertexStage);
        //v.destroy();

        // let p = v.getCenter();
        // console.log(p.x);
    }
}
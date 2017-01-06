import { GraphOptions } from "./api/GraphOptions"
import { VertexOptions } from "./api/VertexOptions"

import { Vertex } from "./core/Vertex"
import * as Commons from "./core/Commons"
import { Layer } from "./core/Layer"
import { Renderer } from "./core/Renderer"
import { DelegationRegistry } from "./core/DelegationRegistry"

import * as DRAW from "./pixi/VertexDrawers"
import { VertexDelegate } from "./pixi/VertexDelegate"
import { LayerDelegate } from "./pixi/LayerDelegate"
import { RendererDelegate } from "./pixi/RendererDelegate"


export class Networkjs {

    private _options: GraphOptions;
    constructor(options: GraphOptions) {
        this._options = options;
    }

    public start() {

        let registry = DRAW.DrawersRegistry.getInstance();
        registry.registerDrawer(VertexOptions.ShapeType.CIRCLE, DRAW.circleDrawer);
        registry.registerDrawer(VertexOptions.ShapeType.RECTANGLE, DRAW.rectangleDrawer);
        registry.registerDrawer(VertexOptions.ShapeType.TRIANGLE, DRAW.triangleDrawer);
        registry.registerDrawer(VertexOptions.ShapeType.ELLIPSE, DRAW.ellipseDrawer);

        let v1Options = {
            id: '1',
            label: 'Node A',
            position: {
                x: 100,
                y: 100
            },
            shapeOptions: {
                type: 'circle',
                options: {
                    radius: 50
                }
            }
        };

        let v2Options = {
            id: '2',
            label: 'Node B',
            position: {
                x: 50,
                y: 50
            },
            shapeOptions: {
                type: 'ellipse',
                options: {
                    width: 40,
                    height: 15,
                }
            }
        }


        let v1 = new Vertex(v1Options);
        let v2 = new Vertex(v2Options);

        let vd1 = new VertexDelegate(v1Options.shapeOptions.type);
        let vd2 = new VertexDelegate(v2Options.shapeOptions.type);

        let reg = DelegationRegistry.getInstance();
        reg.addDelegate(v1, vd1);
        reg.addDelegate(v2, vd2);

        v1.draw();
        v2.draw();

        let vertexLayer: Layer<Vertex> = new Layer<Vertex>();

        let vld: LayerDelegate = new LayerDelegate();
        reg.addDelegate(vertexLayer, vld);

        vertexLayer.addChild(v1);
        vertexLayer.addChild(v2);

        let renderer: Renderer = new Renderer();
        let rd : RendererDelegate = new RendererDelegate(500,500, '#graph');
        reg.addDelegate(renderer, rd);

        renderer.render(vertexLayer);

        v1.move({ x: 10, y: 20 });
        v1.rotate(1.5708);

        //vertexLayer.removeChild(v2);

        renderer.render(vertexLayer);

    }
}
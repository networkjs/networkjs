import { GraphOptions } from "./api/GraphOptions"
import { VertexOptions } from "./api/VertexOptions"
import { EdgeOptions } from "./api/EdgeOptions"

import { Vertex } from "./core/Vertex"
import { Edge } from "./core/Edge"
import * as Commons from "./core/Commons"
import { Layer } from "./core/Layer"
import { Renderer } from "./core/Renderer"
import { DelegationRegistry } from "./core/DelegationRegistry"
import { Model } from "./core/Model"

import * as DRAW from "./pixi/VertexDrawers"
import * as EDRAW from "./pixi/EdgeDrawers"
import { VertexDelegate } from "./pixi/VertexDelegate"
import { LayerDelegate } from "./pixi/LayerDelegate"
import { RendererDelegate } from "./pixi/RendererDelegate"
import { ModelDelegate } from "./pixi/ModelDelegate"


export class Networkjs {

    private _options: GraphOptions;
    private _registry: DelegationRegistry = DelegationRegistry.getInstance();
    private _model: Model = Model.getInstance();
    
    constructor(options: GraphOptions) {

        let vReg = DRAW.VertexDrawerRegistry.getInstance();
        vReg.registerDrawer(VertexOptions.ShapeType.CIRCLE, DRAW.circleDrawer);
        vReg.registerDrawer(VertexOptions.ShapeType.RECTANGLE, DRAW.rectangleDrawer);
        vReg.registerDrawer(VertexOptions.ShapeType.TRIANGLE, DRAW.triangleDrawer);
        vReg.registerDrawer(VertexOptions.ShapeType.ELLIPSE, DRAW.ellipseDrawer);
        
        let eReg = EDRAW.EdgeDrawerRegistry.getInstance();
        eReg.registerDrawer(EdgeOptions.ShapeType.LINE, EDRAW.lineDrawer);

        let md = new ModelDelegate();
        this._registry.addDelegate(this._model, md);

        // create vertices and edges and ask delegate to draw their shape
        this._model.createVertices(options.vertices);
        this._model.createEdges(options.edges);
        this._model.draw()

        // add vertices to vertices layer
        let vs = this._model.getVertices(); 

        let vertexLayer: Layer<Vertex> = new Layer<Vertex>();
        let vld: LayerDelegate = new LayerDelegate();
        this._registry.addDelegate(vertexLayer, vld);

        for (let v of vs) {
            vertexLayer.addChild(v);
        }

        // add edges to edge layer
        let es = this._model.getEdges();

        let edgeLayer: Layer<Edge> = new Layer<Edge>();
        let eld: LayerDelegate = new LayerDelegate();
        this._registry.addDelegate(edgeLayer, eld);

        for (let e of es) {
            edgeLayer.addChild(e);
        }

        // Add layers to main layer and ask renderer to render (using delegate)
        let mainLayer: Layer<Layer<any>> = new Layer<Layer<any>>();
        let mainLayerd: LayerDelegate = new LayerDelegate();
        this._registry.addDelegate(mainLayer, mainLayerd);

        mainLayer.addChild(edgeLayer);
        mainLayer.addChild(vertexLayer);

        let renderer: Renderer = new Renderer();
        let rd: RendererDelegate = new RendererDelegate(options.width || 0 , options.height || 0, options.container);
        this._registry.addDelegate(renderer, rd);

        //renderer.render(vertexLayer);

        // v1.move({ x: 10, y: 20 });
        // v1.rotate(1.5708);

        //vertexLayer.removeChild(v2);

        renderer.render(mainLayer);
    }
}
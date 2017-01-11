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
import { ShapeOptionsRegistry } from "./core/ShapeOptionsRegistry"


import * as VDRAW from "./pixi/VertexDrawers"
import * as EDRAW from "./pixi/EdgeDrawers"
import { VertexDelegate } from "./pixi/VertexDelegate"
import { LayerDelegate } from "./pixi/LayerDelegate"
import { RendererDelegate } from "./pixi/RendererDelegate"
import { ModelDelegate } from "./pixi/ModelDelegate"

declare const _: any;

export class Networkjs {

    private _options: GraphOptions;
    private _registry: DelegationRegistry = DelegationRegistry.getInstance();
    private _model: Model = Model.getInstance();

    constructor(options: GraphOptions) {
        this._registerDrawers();

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
        let rd: RendererDelegate = new RendererDelegate(options.width || 0, options.height || 0, options.container);

        this._registry.addDelegate(renderer, rd);


        let anim = function () {
            requestAnimationFrame(anim);
            renderer.render(mainLayer);
        };

        anim();
    }

    private _registerDrawers() {
        let vReg = VDRAW.VertexDrawerRegistry.getInstance();
        vReg.registerDrawer(VertexOptions.ShapeType.CIRCLE, VDRAW.circleDrawer);
        vReg.registerDrawer(VertexOptions.ShapeType.RECTANGLE, VDRAW.rectangleDrawer);
        vReg.registerDrawer(VertexOptions.ShapeType.TRIANGLE, VDRAW.triangleDrawer);
        vReg.registerDrawer(VertexOptions.ShapeType.ELLIPSE, VDRAW.ellipseDrawer);

        let eReg = EDRAW.EdgeDrawerRegistry.getInstance();
        eReg.registerDrawer(EdgeOptions.ShapeType.LINE, EDRAW.lineDrawer);

        let oReg = ShapeOptionsRegistry.getInstance();
        oReg.registerOptions(VertexOptions.ShapeType.CIRCLE, Networkjs.getDefaultCircleOptions());
        oReg.registerOptions(VertexOptions.ShapeType.RECTANGLE, Networkjs.getDefaultRectangleOptions());
        oReg.registerOptions(VertexOptions.ShapeType.ELLIPSE, Networkjs.getDefaultEllipseOptions());
        oReg.registerOptions(VertexOptions.ShapeType.TRIANGLE, Networkjs.getDefaultTriangleOptions());
    }

    public static getDefaultCircleOptions(): VertexOptions.ShapeOptions {
        let origin: VertexOptions.CircleOptions = {
            backgroundAlpha: 1,
            backgroundColor: 0x00ccff, //(50%)
            borderWidth: 2,
            borderAlpha: 1,
            borderColor: 0x008fb3, //(35%)
            radius: 15
        };

        let def: VertexOptions.CircleOptions = _.merge({}, origin);

        let overed: VertexOptions.CircleOptions = _.merge({}, origin, {
            backgroundColor: 0x4ddbff,
        });

        let dragged: VertexOptions.CircleOptions = _.merge({}, origin, {
            backgroundAlpha: 0.7,
            borderAlpha: 0.7
        });

        let selected: VertexOptions.CircleOptions = _.merge({}, origin, {
            backgroundColor: 0xfb7e81,
            borderColor: 0xfa0a10
        });

        let selected_overed: VertexOptions.CircleOptions = _.merge({}, overed, selected, {

        });

        let selected_dragged: VertexOptions.CircleOptions = _.merge({}, dragged, selected, {
            backgroundAlpha: 0.7,
            borderAlpha: 0.7
        });

        return {
            default: {
                type: VertexOptions.ShapeType.CIRCLE,
                options: def
            },
            overed: {
                type: VertexOptions.ShapeType.CIRCLE,
                options: overed
            },
            dragged: {
                type: VertexOptions.ShapeType.CIRCLE,
                options: dragged

            },
            selected: {
                type: VertexOptions.ShapeType.CIRCLE,
                options: selected
            },
            selected_overed: {
                type: VertexOptions.ShapeType.CIRCLE,
                options: selected_overed
            },
            selected_dragged: {
                type: VertexOptions.ShapeType.CIRCLE,
                options: selected_dragged
            }
        };
    }


    public static getDefaultRectangleOptions(): VertexOptions.ShapeOptions {
        let origin: VertexOptions.RectangleOptions = {
            backgroundAlpha: 1,
            backgroundColor: 0x00ccff, //(50%)
            borderWidth: 2,
            borderAlpha: 1,
            borderColor: 0x008fb3, //(35%)
            width: 30,
            height: 30,
            radius: 2
        };

        let def: VertexOptions.RectangleOptions = _.merge({}, origin);

        let overed: VertexOptions.RectangleOptions = _.merge({}, origin, {
            backgroundColor: 0x4ddbff,
        });

        let dragged: VertexOptions.RectangleOptions = _.merge({}, origin, {
            backgroundAlpha: 0.7,
            borderAlpha: 0.7
        });

        let selected: VertexOptions.RectangleOptions = _.merge({}, origin, {
            backgroundColor: 0xfb7e81,
            borderColor: 0xfa0a10
        });

        let selected_overed: VertexOptions.RectangleOptions = _.merge({}, overed, selected, {

        });

        let selected_dragged: VertexOptions.RectangleOptions = _.merge({}, dragged, selected, {
            backgroundAlpha: 0.7,
            borderAlpha: 0.7
        });

        return {
            default: {
                type: VertexOptions.ShapeType.RECTANGLE,
                options: def
            },
            overed: {
                type: VertexOptions.ShapeType.RECTANGLE,
                options: overed
            },
            dragged: {
                type: VertexOptions.ShapeType.RECTANGLE,
                options: dragged

            },
            selected: {
                type: VertexOptions.ShapeType.RECTANGLE,
                options: selected
            },
            selected_overed: {
                type: VertexOptions.ShapeType.RECTANGLE,
                options: selected_overed
            },
            selected_dragged: {
                type: VertexOptions.ShapeType.RECTANGLE,
                options: selected_dragged
            }
        };
    }

    public static getDefaultEllipseOptions(): VertexOptions.ShapeOptions {
        let origin: VertexOptions.EllipseOptions = {
            backgroundAlpha: 1,
            backgroundColor: 0x00ccff, //(50%)
            borderWidth: 2,
            borderAlpha: 1,
            borderColor: 0x008fb3, //(35%)
            width: 60,
            height: 30
        };

        let def: VertexOptions.EllipseOptions = _.merge({}, origin);

        let overed: VertexOptions.EllipseOptions = _.merge({}, origin, {
            backgroundColor: 0x4ddbff,
        });

        let dragged: VertexOptions.EllipseOptions = _.merge({}, origin, {
            backgroundAlpha: 0.7,
            borderAlpha: 0.7
        });

        let selected: VertexOptions.EllipseOptions = _.merge({}, origin, {
            backgroundColor: 0xfb7e81,
            borderColor: 0xfa0a10
        });

        let selected_overed: VertexOptions.EllipseOptions = _.merge({}, overed, selected, {

        });

        let selected_dragged: VertexOptions.EllipseOptions = _.merge({}, dragged, selected, {
            backgroundAlpha: 0.7,
            borderAlpha: 0.7
        });

        return {
            default: {
                type: VertexOptions.ShapeType.ELLIPSE,
                options: def
            },
            overed: {
                type: VertexOptions.ShapeType.ELLIPSE,
                options: overed
            },
            dragged: {
                type: VertexOptions.ShapeType.ELLIPSE,
                options: dragged
            },
            selected: {
                type: VertexOptions.ShapeType.ELLIPSE,
                options: selected
            },
            selected_overed: {
                type: VertexOptions.ShapeType.ELLIPSE,
                options: selected_overed
            },
            selected_dragged: {
                type: VertexOptions.ShapeType.ELLIPSE,
                options: selected_dragged
            }
        };
    }

    public static getDefaultTriangleOptions(): VertexOptions.ShapeOptions {
        let origin: VertexOptions.TriangleOptions = {
            backgroundAlpha: 1,
            backgroundColor: 0x00ccff, //(50%)
            borderWidth: 2,
            borderAlpha: 1,
            borderColor: 0x008fb3, //(35%)
            width: 30,
            height: 30
        };

        let def: VertexOptions.TriangleOptions = _.merge({}, origin);

        let overed: VertexOptions.TriangleOptions = _.merge({}, origin, {
            backgroundColor: 0x4ddbff,
        });

        let dragged: VertexOptions.TriangleOptions = _.merge({}, origin, {
            backgroundAlpha: 0.7,
            borderAlpha: 0.7
        });

        let selected: VertexOptions.TriangleOptions = _.merge({}, origin, {
            backgroundColor: 0xfb7e81,
            borderColor: 0xfa0a10
        });

        let selected_overed: VertexOptions.TriangleOptions = _.merge({}, overed, selected, {

        });

        let selected_dragged: VertexOptions.TriangleOptions = _.merge({}, dragged, selected, {
            backgroundAlpha: 0.7,
            borderAlpha: 0.7
        });

        return {
            default: {
                type: VertexOptions.ShapeType.TRIANGLE,
                options: def
            },
            overed: {
                type: VertexOptions.ShapeType.TRIANGLE,
                options: overed
            },
            dragged: {
                type: VertexOptions.ShapeType.TRIANGLE,
                options: dragged
            },
            selected: {
                type: VertexOptions.ShapeType.TRIANGLE,
                options: selected
            },
            selected_overed: {
                type: VertexOptions.ShapeType.TRIANGLE,
                options: selected_overed
            },
            selected_dragged: {
                type: VertexOptions.ShapeType.TRIANGLE,
                options: selected_dragged
            }
        };
    }
}
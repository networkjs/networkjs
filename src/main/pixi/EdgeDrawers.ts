import { EdgeOptions } from "../api/EdgeOptions"
import * as Commons from "../core/Commons"
import { Vertex } from "../core/Vertex"


export class EdgeDrawerRegistry {

    private static _instance: EdgeDrawerRegistry = new EdgeDrawerRegistry();
    private _drawers: Map<string, (edgeOptions: EdgeOptions.Options,
        fromPosition: Commons.Point,
        toPosition: Commons.Point,
        container: PIXI.DisplayObject) => void> = new Map();

    constructor() {
        if (EdgeDrawerRegistry._instance) {
            throw new Error("Error: Instantiation failed: Use DrawersRegistry.getInstance() instead of new.");
        }
        EdgeDrawerRegistry._instance = this;
    }

    public static getInstance(): EdgeDrawerRegistry {
        return EdgeDrawerRegistry._instance;
    }

    public registerDrawer(shape: EdgeOptions.ShapeType | string,
        fn: (edgeOptions: EdgeOptions.Options,
            fromPosition: Commons.Point,
            toPosition: Commons.Point,
            container: PIXI.DisplayObject) => void) {
        this._drawers.set(Commons.getEdgeShapeAsString(shape), fn);
    }

    public getDrawer(shape: EdgeOptions.ShapeType | string) {
        return this._drawers.get(Commons.getEdgeShapeAsString(shape));
    }
}


export function lineDrawer(edgeOptions: EdgeOptions.Options, fromPosition: Commons.Point, toPosition: Commons.Point, container: PIXI.Container) {
    if (edgeOptions.shapeOptions == undefined)
        throw new Error('Cannot draw line, shapeOptions undefined');

    let so = edgeOptions.shapeOptions;
    let g = new PIXI.Graphics();
    g.lineStyle(so.width, so.color, so.alpha);
    g.moveTo(fromPosition.x, fromPosition.y);
    g.lineTo(toPosition.x, toPosition.y);
    g.endFill();
    container.addChild(g);
    //console.debug('lineDrawer called');
};


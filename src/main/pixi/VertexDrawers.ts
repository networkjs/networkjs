import { VertexOptions } from "../api/VertexOptions"
import * as Commons from "../core/Commons"
import { Vertex } from "../core/Vertex"


export class DrawersRegistry {

    private static _instance: DrawersRegistry = new DrawersRegistry();
    private _drawers: Map<string, (vertexOptions: VertexOptions.Options, container: PIXI.DisplayObject) => void> = new Map();

    constructor() {
        if (DrawersRegistry._instance) {
            throw new Error("Error: Instantiation failed: Use DrawersRegistry.getInstance() instead of new.");
        }
        DrawersRegistry._instance = this;
    }

    public static getInstance(): DrawersRegistry {
        return DrawersRegistry._instance;
    }

    public registerDrawer(shape: VertexOptions.ShapeType | string,
        fn: (vertexOptions: VertexOptions.Options, container: PIXI.DisplayObject) => void) {
        this._drawers.set(Commons.getAsString(shape), fn);
    }

    public getDrawer(shape: VertexOptions.ShapeType | string) {
        return this._drawers.get(Commons.getAsString(shape));
    }
}


export function circleDrawer(vertexOptions: VertexOptions.Options, graphics: PIXI.Graphics) {
    if (vertexOptions.shapeOptions == undefined)
        throw new Error('Cannot draw circle, shapeOptions undefined');
    if (vertexOptions.position == undefined)
        throw new Error('Cannot draw circle, position undefined');

    let so = vertexOptions.shapeOptions.options;
    initGraphics(vertexOptions.position, so, graphics);

    graphics.drawCircle(vertexOptions.position.x, vertexOptions.position.y, so.radius);

    _endg(vertexOptions, graphics);
};

export function rectangleDrawer(vertexOptions: VertexOptions.Options, graphics: PIXI.Graphics) {
    if (vertexOptions.shapeOptions == undefined)
        throw new Error('Cannot draw circle, shapeOptions undefined');
    if (vertexOptions.position == undefined)
        throw new Error('Cannot draw circle, position undefined');

    let so = vertexOptions.shapeOptions.options;
    initGraphics(vertexOptions.position, so, graphics);

    let radius = so.radius;
    if (radius) {
        graphics.drawRoundedRect(
            - so.width / 2,
            - so.height / 2,
            so.width,
            so.height,
            radius);
    }
    else {
        graphics.drawRect(
            - so.width / 2,
            - so.height / 2,
            so.width,
            so.height);
    }

    _endg(vertexOptions, graphics);
};

export function ellipseDrawer(vertexOptions: VertexOptions.Options, graphics: PIXI.Graphics) {
    if (vertexOptions.shapeOptions == undefined)
        throw new Error('Cannot draw circle, shapeOptions undefined');
    if (vertexOptions.position == undefined)
        throw new Error('Cannot draw circle, position undefined');

    let so = vertexOptions.shapeOptions.options;
    initGraphics(vertexOptions.position, so, graphics);

    graphics.drawEllipse(
        vertexOptions.position.x,
        vertexOptions.position.y,
        so.width / 2,
        so.height / 2);

    _endg(vertexOptions, graphics);
};

//TODO change the method this is not the correct center 
export function triangleDrawer(vertexOptions: VertexOptions.Options, graphics: PIXI.Graphics) {
    if (vertexOptions.shapeOptions == undefined)
        throw new Error('Cannot draw circle, shapeOptions undefined');
    if (vertexOptions.position == undefined)
        throw new Error('Cannot draw circle, position undefined');

    let so = vertexOptions.shapeOptions.options;
    initGraphics(vertexOptions.position, so, graphics);

    let center = computeCenterTriangle(so.width, so.height);

    let dx = vertexOptions.position.x - center.x;
    let dy = vertexOptions.position.y - center.y;

    let a: Commons.Point = { x: dx + so.width / 2, y: dy + 0 };
    let b: Commons.Point = { x: a.x + so.width / 2, y: a.y + so.height };
    let c: Commons.Point = { x: a.x - so.width / 2, y: a.y + so.height };

    graphics.moveTo(a.x, a.y);
    graphics.lineTo(b.x, b.y);
    graphics.lineTo(c.x, c.y);
    graphics.lineTo(a.x, a.y);

    _endg(vertexOptions, graphics);
};

function computeCenterTriangle(width: number, height: number): Commons.Point {
    //     A
    //    / \
    //   C _ B

    let ax: number = width / 2;
    let ax2: number = ax * ax;
    let ay: number = 0;
    let ay2: number = ay * ay;

    let bx: number = width;
    let bx2: number = bx * bx;
    let by: number = height;
    let by2: number = by * by;

    let cx: number = 0;
    let cx2: number = cx * cx;
    let cy: number = height;
    let cy2: number = cy * cy;

    let d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));

    let vx: number = ((ax2 + ay2) * (by - cy) + (bx2 + by2) * (cy - ay) + (cx2 + cy2) * (ay - by)) / d;
    let vy: number = ((ax2 + ay2) * (cx - bx) + (bx2 + by2) * (ax - cx) + (cx2 + cy2) * (bx - ax)) / d;

    return { x: vx, y: vy };
}


function initGraphics(position: Commons.Point, shapeOptions: any, graphics: PIXI.Graphics) {
    //Set the center of the graphics in order to rotate around the center
    graphics.position = new PIXI.Point(position.x, position.y);

    graphics.lineStyle(shapeOptions.borderWidth, shapeOptions.borderColor, shapeOptions.borderAlpha);
    graphics.beginFill(shapeOptions.backgroundColor, shapeOptions.backgroundAlpha);
}

function _endg(vo: VertexOptions.Options, graphics: PIXI.Graphics): PIXI.Graphics {
    if (vo.rotation !== 0)
        graphics.rotation = vo.rotation || 0;
    graphics.endFill();

    return graphics;
}

import { VertexOptions } from "../api/VertexOptions"
import * as Commons from "../core/Commons"
import { Vertex } from "../core/Vertex"


export class VertexDrawerRegistry {

    private static _instance: VertexDrawerRegistry = new VertexDrawerRegistry();
    private _drawers: Map<string, (vertexOptions: VertexOptions.Options, container: PIXI.DisplayObject) => void> = new Map();

    constructor() {
        if (VertexDrawerRegistry._instance) {
            throw new Error("Error: Instantiation failed: Use DrawersRegistry.getInstance() instead of new.");
        }
        VertexDrawerRegistry._instance = this;
    }

    public static getInstance(): VertexDrawerRegistry {
        return VertexDrawerRegistry._instance;
    }

    public registerDrawer(shape: VertexOptions.ShapeType | string,
        fn: (vertexOptions: VertexOptions.Options, container: PIXI.DisplayObject) => void) {
        this._drawers.set(Commons.getVertexShapeAsString(shape), fn);
    }

    public getDrawer(shape: VertexOptions.ShapeType | string) {
        return this._drawers.get(Commons.getVertexShapeAsString(shape));
    }
}


export function circleDrawer(vertexOptions: VertexOptions.Options, container: PIXI.Container) {
    if (vertexOptions.shapeOptions == undefined)
        throw new Error('Cannot draw circle, shapeOptions undefined');
    if (vertexOptions.position == undefined)
        throw new Error('Cannot draw circle, position undefined');

    let so = vertexOptions.shapeOptions.options;
    let graphics = initGraphics(vertexOptions.position, so, container);

    graphics.drawCircle(0, 0, so.radius);

    _drawCircleVertexText(vertexOptions, container);
    _endg(vertexOptions, container, graphics);
    console.debug('circleDrawer called');

};

export function rectangleDrawer(vertexOptions: VertexOptions.Options, container: PIXI.Container) {
    if (vertexOptions.shapeOptions == undefined)
        throw new Error('Cannot draw circle, shapeOptions undefined');
    if (vertexOptions.position == undefined)
        throw new Error('Cannot draw circle, position undefined');

    let so = vertexOptions.shapeOptions.options;
    let graphics = initGraphics(vertexOptions.position, so, container);

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

    _drawRectangleVertexText(vertexOptions, container);
    _endg(vertexOptions, container, graphics);
};

export function ellipseDrawer(vertexOptions: VertexOptions.Options, container: PIXI.Container) {
    if (vertexOptions.shapeOptions == undefined)
        throw new Error('Cannot draw circle, shapeOptions undefined');
    if (vertexOptions.position == undefined)
        throw new Error('Cannot draw circle, position undefined');

    let so = vertexOptions.shapeOptions.options;
    let graphics = initGraphics(vertexOptions.position, so, container);

    graphics.drawEllipse(
        0,
        0,
        so.width / 2,
        so.height / 2);
    
    _drawRectangleVertexText(vertexOptions, container);
    _endg(vertexOptions, container, graphics);
};

//TODO change the method this is not the correct center 
export function triangleDrawer(vertexOptions: VertexOptions.Options, container: PIXI.Container) {
    if (vertexOptions.shapeOptions == undefined)
        throw new Error('Cannot draw circle, shapeOptions undefined');
    if (vertexOptions.position == undefined)
        throw new Error('Cannot draw circle, position undefined');

    let so = vertexOptions.shapeOptions.options;
    let graphics = initGraphics(vertexOptions.position, so, container);

    let center = computeCenterTriangle(so.width, so.height);

    let dx = -center.x;
    let dy = -center.y;

    let a: Commons.Point = { x: dx + so.width / 2, y: dy + 0 };
    let b: Commons.Point = { x: a.x + so.width / 2, y: a.y + so.height };
    let c: Commons.Point = { x: a.x - so.width / 2, y: a.y + so.height };

    graphics.moveTo(a.x, a.y);
    graphics.lineTo(b.x, b.y);
    graphics.lineTo(c.x, c.y);
    graphics.lineTo(a.x, a.y);

    _drawRectangleVertexText(vertexOptions, container);
    _endg(vertexOptions, container, graphics);
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


function initGraphics(position: Commons.Point, shapeOptions: any, container: PIXI.Container): PIXI.Graphics {
    //Set the center of the graphics in order to rotate around the center

    container.position = new PIXI.Point(position.x, position.y);
    let graphics = new PIXI.Graphics();
    container.addChild(graphics);

    graphics.lineStyle(shapeOptions.borderWidth, shapeOptions.borderColor, shapeOptions.borderAlpha);
    graphics.beginFill(shapeOptions.backgroundColor, shapeOptions.backgroundAlpha);
    return graphics;
}

function _endg(vo: VertexOptions.Options, container: PIXI.Container, graphics: PIXI.Graphics): PIXI.Graphics {
    if (vo.rotation !== 0)
        graphics.rotation = vo.rotation || 0;
    graphics.endFill();



    return graphics;
}

function _drawCircleVertexText(vo: VertexOptions.Options, c: PIXI.Container): void {
    if (vo.shapeOptions == undefined)
        throw new Error('Cannot draw circle text, shapeOptions undefined');
    let so = vo.shapeOptions;

    let t = new PIXI.Text(vo.label);

    t.x = -so.options.radius;
    t.y = so.options.radius + so.options.radius / 2;

    t.style.fontSize = so.options.radius;
    //TODO code text style
    //if (vo.textOptions !== undefined)
    //    t.style = vo.textOptions

    c.addChild(t);
}

function _drawRectangleVertexText(vo: VertexOptions.Options, c: PIXI.Container): void {
    if (vo.shapeOptions == undefined)
        throw new Error('Cannot draw circle text, shapeOptions undefined');
    let so = vo.shapeOptions;

    let t = new PIXI.Text(vo.label);

    t.x = -so.options.width / 2;
    t.y = so.options.height / 2 + so.options.height / 4;

    t.style.fontSize = Math.min(so.options.width / 2, so.options.height / 2);
    //TODO code text style
    //if (vo.textOptions !== undefined)
    //    t.style = vo.textOptions

    c.addChild(t);
}

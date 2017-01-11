import { VertexOptions } from "../api/VertexOptions"
import * as Commons from "../core/Commons"
import { Vertex } from "../core/Vertex"


export class VertexDrawerRegistry {

    private static _instance: VertexDrawerRegistry = new VertexDrawerRegistry();
    private _drawers: Map<string, (
        position: Commons.Point,
        rotation: number,
        options: any,
        container: PIXI.Container) => void> = new Map();

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
        fn: (
            position: Commons.Point,
            rotation: number,
            options: any,
            container: PIXI.Container) => void) {
        this._drawers.set(Commons.getVertexShapeAsString(shape), fn);
    }

    public getDrawer(shape: VertexOptions.ShapeType | string) {
        return this._drawers.get(Commons.getVertexShapeAsString(shape));
    }
}

export function circleDrawer(
    position: Commons.Point,
    rotation: number,
    options: VertexOptions.CircleOptions,
    container: PIXI.Container) {

    let graphics = initGraphics(position, options, container);

    let o = _shadowOffset(options.radius * 2, options.radius * 2);

    //shadow 
    graphics.beginFill(0x000000, 0.3);
    graphics.lineStyle(options.borderWidth, options.borderColor, 0);
    graphics.drawCircle(o, o, options.radius);

    graphics.beginFill(options.backgroundColor, options.backgroundAlpha)
    graphics.lineStyle(options.borderWidth, options.borderColor, options.borderAlpha);
    graphics.drawCircle(0, 0, options.radius);

    //_drawCircleVertexText(vertexOptions, container);
    _endg(rotation, container, graphics);
    //console.debug('circleDrawer called');

};

export function rectangleDrawer(
    position: Commons.Point,
    rotation: number,
    options: VertexOptions.RectangleOptions,
    container: PIXI.Container) {

    let graphics = initGraphics(position, options, container);

    let radius = options.radius;
    let x = - options.width / 2;
    let y = - options.height / 2;
    let w = options.width;
    let h = options.height;

    //shadow 
    let o = _shadowOffset(w, h);
    graphics.beginFill(0x000000, 0.3);
    graphics.lineStyle(options.borderWidth, options.borderColor, 0);
    graphics.drawRoundedRect(x + o, y + o, w, h, radius);

    graphics.lineStyle(options.borderWidth, options.borderColor, options.borderAlpha);
    graphics.beginFill(options.backgroundColor, options.backgroundAlpha);
    graphics.drawRoundedRect(x, y, w, h, radius);

    //_drawRectangleVertexText(vertexOptions, container);
    _endg(rotation, container, graphics);
};

function _shadowOffset(width: number, height: number) {
    let m = Math.min(width, height);
    return Math.max(2, Math.min(10, m / 10));
}

export function ellipseDrawer(
    position: Commons.Point,
    rotation: number,
    options: VertexOptions.EllipseOptions,
    container: PIXI.Container
) {
    let graphics = initGraphics(position, options, container);

    let w = options.width;
    let h = options.height;
    let o = _shadowOffset(w, h);

    //shadow 
    graphics.beginFill(0x000000, 0.3);
    graphics.lineStyle(options.borderWidth, options.borderColor, 0);
    graphics.drawEllipse(o, o, w / 2, h / 2);

    graphics.lineStyle(options.borderWidth, options.borderColor, options.borderAlpha);
    graphics.beginFill(options.backgroundColor, options.backgroundAlpha);
    graphics.drawEllipse(
        0,
        0,
        w / 2,
        h / 2);

    //_drawRectangleVertexText(vertexOptions, container);
    _endg(rotation, container, graphics);
};

//TODO change the method this is not the correct center 
export function triangleDrawer(
    position: Commons.Point,
    rotation: number,
    options: VertexOptions.TriangleOptions,
    container: PIXI.Container
) {

    let graphics = initGraphics(position, options, container);
    let w = options.width;
    let h = options.height;

    let center = computeCenterTriangle(options.width, options.height);

    let dx = -center.x;
    let dy = -center.y;
    let top: Commons.Point = { x: dx + w / 2, y: dy + 0 };

    let o = _shadowOffset(w, h);

    //shadow
    graphics.beginFill(0x000000, 0.3);
    graphics.lineStyle(options.borderWidth, options.borderColor, 0);
    let topShadow: Commons.Point = { x: top.x + o, y: top.y + o };
    _drawTriangleFromTop(topShadow, w, h, graphics);

    //normal
    graphics.lineStyle(options.borderWidth, options.borderColor, options.borderAlpha);
    graphics.beginFill(options.backgroundColor, options.backgroundAlpha);
    _drawTriangleFromTop(top, w, h, graphics);

    //_drawRectangleVertexText(vertexOptions, container);
    _endg(rotation, container, graphics);
};

function _drawTriangleFromTop(top: Commons.Point, width: number, height: number, graphics: PIXI.Graphics) {
    let b: Commons.Point = { x: top.x + width / 2, y: top.y + height };
    let c: Commons.Point = { x: top.x - width / 2, y: top.y + height };

    graphics.moveTo(top.x, top.y);
    graphics.lineTo(b.x, b.y);
    graphics.lineTo(c.x, c.y);
    graphics.lineTo(top.x, top.y);
}

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


function initGraphics(position: Commons.Point, options: VertexOptions.HasBorder & VertexOptions.HasBackground, container: PIXI.Container): PIXI.Graphics {
    //Set the center of the graphics in order to rotate around the center
    container.position = new PIXI.Point(position.x, position.y);
    let graphics = new PIXI.Graphics();
    return graphics;
}

function _endg(rotation: number, container: PIXI.Container, graphics: PIXI.Graphics): PIXI.Graphics {
    graphics.rotation = rotation;
    graphics.endFill();
    if (container.children.length > 0)
        container.removeChildAt(0);
    container.addChild(graphics);
    return graphics;
}

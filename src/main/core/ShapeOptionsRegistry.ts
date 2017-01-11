import * as VO from "../api/VertexOptions"

import * as Commons from "../core/Commons"

export class ShapeOptionsRegistry {

    private static _instance: ShapeOptionsRegistry = new ShapeOptionsRegistry();
    private _drawers: Map<VO.VertexOptions.ShapeType | string, VO.VertexOptions.ShapeOptions> = new Map();

    constructor() {
        if (ShapeOptionsRegistry._instance) {
            throw new Error("Error: Instantiation failed: Use DefaultShapeOptionsRegistry.getInstance() instead of new.");
        }
        ShapeOptionsRegistry._instance = this;
    }

    public static getInstance(): ShapeOptionsRegistry {
        return ShapeOptionsRegistry._instance;
    }

    public registerOptions(
        shape: VO.VertexOptions.ShapeType | string,
        shapeOptions: VO.VertexOptions.ShapeOptions) {
        this._drawers.set(Commons.getVertexShapeAsString(shape), shapeOptions);
    }

    public getOptions(shape: VO.VertexOptions.ShapeType | string): VO.VertexOptions.ShapeOptions {
        let s = Commons.getVertexShapeAsString(shape);
        let found = this._drawers.get(s);
        if (!found)
            throw new Error('Could not find options for shape type;' + s)
        return found;
    }
}
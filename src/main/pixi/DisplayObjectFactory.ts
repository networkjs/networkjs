import { VertexOptions } from "../api/VertexOptions"

export function displayObjectFactory(options: VertexOptions.Options): PIXI.DisplayObject {
    if (options.shapeOptions === undefined)
        throw new Error('shapeOptions are not defined')
    switch (options.shapeOptions.type) {
        case VertexOptions.ShapeType.CIRCLE:
        case VertexOptions.ShapeType.RECTANGLE:
        case VertexOptions.ShapeType.ELLIPSE:
        case VertexOptions.ShapeType.TRIANGLE:
        default:
            return new PIXI.Graphics();
    }
}
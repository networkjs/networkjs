import { VertexOptions } from "../api/VertexOptions"
import * as Commons from "../core/Commons"

export function vertexDisplayObjectFactory(shapeType: VertexOptions.ShapeType | string): PIXI.DisplayObject {

    switch (Commons.getAsString(shapeType)) {
        case Commons.getAsString(VertexOptions.ShapeType.CIRCLE):
        case Commons.getAsString(VertexOptions.ShapeType.RECTANGLE):
        case Commons.getAsString(VertexOptions.ShapeType.ELLIPSE):
        case Commons.getAsString(VertexOptions.ShapeType.TRIANGLE):
        default:
            return new PIXI.Graphics();
    }
}
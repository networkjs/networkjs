import { VertexOptions } from "../api/VertexOptions"
import * as Commons from "../core/Commons"

export function vertexDisplayObjectFactory(shapeType: VertexOptions.ShapeType | string): PIXI.DisplayObject {

    switch (Commons.getVertexShapeAsString(shapeType)) {
        case Commons.getVertexShapeAsString(VertexOptions.ShapeType.CIRCLE):
        case Commons.getVertexShapeAsString(VertexOptions.ShapeType.RECTANGLE):
        case Commons.getVertexShapeAsString(VertexOptions.ShapeType.ELLIPSE):
        case Commons.getVertexShapeAsString(VertexOptions.ShapeType.TRIANGLE):
        default:
            return new PIXI.Container();
    }
}
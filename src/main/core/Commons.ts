import { VertexOptions } from "../api/VertexOptions"
import { EdgeOptions } from "../api/EdgeOptions"


export interface Point {
    x: number
    y: number
}

export interface HasRadius {
    radius: number
}

export interface HasWidth {
    width: number
}

export interface HasHeight {
    height: number
}

export interface HasWidthAndHeight extends HasWidth, HasHeight {
}

export function getVertexShapeAsString(shape: VertexOptions.ShapeType | string): string {
    if (typeof (shape) === 'string')
        return shape as string;
    else {
        let s = shape as VertexOptions.ShapeType;
        return VertexOptions.ShapeType[shape].toLowerCase()
    }
}

export function getEdgeShapeAsString(shape: EdgeOptions.ShapeType | string): string {
    if (typeof (shape) === 'string')
        return shape as string;
    else {
        let s = shape as EdgeOptions.ShapeType;
        return EdgeOptions.ShapeType[shape].toLowerCase()
    }
}
import { VertexOptions } from "../api/VertexOptions"

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

export function getAsString(shape: VertexOptions.ShapeType | string): string {
    if (typeof (shape) === 'string')
        return shape as string;
    else {
        let s = shape as VertexOptions.ShapeType;
        return VertexOptions.ShapeType[shape].toLowerCase()
    }
}
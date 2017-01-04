import * as Commons from "../api/Commons"
import { VertexOptions } from "../api/VertexOptions"


let c = function (position: Commons.Point, radius: number): Commons.Point {
    return {
        x: position.x + (radius / 2),
        y: position.y + (radius / 2)
    }
}

export function defaultCenterEvaluator(options: VertexOptions.Options): Commons.Point {
    if (!options.shapeOptions)
        throw new Error(`Shape options are not defined`);
    if (!options.position)
        throw new Error(`Position is not defined`);

    switch (options.shapeOptions.type) {
        case 'circle': {
            return c(options.position, options.shapeOptions.options.radius);
        }
        default :
            return { x: 0, y: 0 }
    }  
}
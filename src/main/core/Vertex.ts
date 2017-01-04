import * as Commons from "../api/Commons"
import { VertexOptions } from "../api/VertexOptions"

export class Vertex {
    private _options: VertexOptions.Options
    private static _count: number

    constructor(vertexOptions: VertexOptions.Options) {

        let defaultVertex: VertexOptions.Options = {
            id: `Vertex ${Vertex._count}`,
            label: `Label for Vertex ${Vertex._count}`,
            position: { x: 0, y: 0 },
            shapeOptions: {
                type: 'circle',
                options: {
                    backgroundAlpha: 1,
                    backgroundColor: 0xccf5ff,
                    borderWidth: 2,
                    borderAlpha: 0.8,
                    borderColor: 0x00b5e2,
                    radius: 20
                }
            },
            textOptions: {}
        };

        this._options = Object.assign(
            defaultVertex, vertexOptions);

        Vertex._count++;
    }


    /**
     * Render the vertex on screen.
     * 
     * @param {Function} renderFunction
     * 
     * @memberOf Vertex
     */
    public render(renderF: Function): void {
        renderF(this._options);
    }
}

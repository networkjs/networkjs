export namespace EdgeOptions {
    /**
     * Default options to pass to create an Edge.
     * 
     * @export
     * @interface Options
     */
    export interface Options {
        /**
         * The id of the from vertex.
         * 
         * @type {string}
         * @memberOf Options
         */
        from: string
        
        /**
         * The id of the to vertex.
         * 
         * @type {string}
         * @memberOf Options
         */
        to: string
        /**
         * Shape options of the edge.
         * 
         * @type {ShapeOptions}
         * @memberOf Options
         */
        shapeOptions?: ShapeOptions
    }


    /*
        Helper array with default types of shape supported for edges.
     */
    export const shapeTypes = ['line'];

    /**
     * Options to specify the shape of the edge.
     * 
     * @export
     * @class ShapeOptions
     */
    export class ShapeOptions {
        /**
         * The type of the shape. Example : line.
         * 
         * @type {string}
         * @memberOf ShapeOptions
         */
        type: string    
        /**
         * The color of the edge.
         * 
         * @type {number}
         * @memberOf ShapeOptions
         */
        color: number
        /**
         * The width of the edge.
         * 
         * @type {number}
         * @memberOf ShapeOptions
         */
        width: number
        /**
         * The transparency of the edge (value between 0 and 1).
         * 
         * @type {number}
         * @memberOf ShapeOptions
         */
        alpha: number
    }
}

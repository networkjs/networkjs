import * as Commons from "../core/Commons"

export namespace VertexOptions {
    /**
     * Default options to pass to create a Vertex.
     * 
     * @export
     * @interface Options
     */
    export interface Options {
        /**
         * The id of the vertex.
         * 
         * @type {string}
         * @memberOf Options
         */
        id: string,
        /**
         * The label to display for the vertex.
         * 
         * @type {string}
         * @memberOf Options
         */
        label: string,
        /**
         * The position of the vertex.
         * 
         * @type {Commons.Position}
         * @memberOf Options
         */
        position?: Commons.Point
        /**
         * The rotation of the vertex.
         * 
         * @type {number}
         * @memberOf Options
         */
        rotation?: number
        /**
         * The shape options of the vertex.
         * 
         * @type {ShapeOptions}
         * @memberOf Options
         */
        shapeOptions?: ShapeOptions
        /**
         * The text options of the vertex.
         * 
         * @type {TextOptions}
         * @memberOf Options
         */
        textOptions?: TextOptions
    }


    export enum ShapeType {
        CIRCLE,
        RECTANGLE,
        ELLIPSE,
        TRIANGLE
    }

    /**
     * Options to specify the shape of the vertex.
     * 
     * @export
     * @interface ShapeOptions
     */
    export interface ShapeOptions {
        /**
         * The type of the shape. Example : circle.
         * 
         * @type {string}
         * @memberOf ShapeOptions
         */
        type: string | ShapeType
        /**
         * The assoicated options for the given shape.
         * 
         * @type {*}
         * @memberOf ShapeOptions
         */
        options: any
    }


    /**
     *  Options to specify the border of the Vertex when applicable
     * 
     * @interface HasBorder
     */
    interface HasBorder {
        /**
         * Width of the border.
         * 
         * @type {number}
         * @memberOf HasBorder
         */
        borderWidth: number
        /**
         * Transparency of the border (value between 0 and 1).
         * 
         * @type {number}
         * @memberOf HasBorder
         */
        borderAlpha: number
        /**
         * Color of the border.
         * 
         * @type {number}
         * @memberOf HasBorder
         */
        borderColor: number
    }

    /**
     * Options to specify the background of the Vertex when applicable.
     * 
     * @interface HasBackground
     */
    interface HasBackground {
        /**
         * Transparency of the background (value between 0 and 1).
         * 
         * @type {number}
         * @memberOf HasBackground
         */
        backgroundAlpha: number
        /**
         * Color of the background.
         * 
         * @type {number}
         * @memberOf HasBackground
         */
        backgroundColor: number
    }

    /**
     * Options to specify the shape of a vertex as a circle.
     * 
     * @export
     * @interface CircleOptions
     * @extends {HasBorder}
     * @extends {HasBackground}
     * @extends {Commons.HasRadius}
     */
    export interface CircleOptions extends HasBorder, HasBackground, Commons.HasRadius {
    }

    /**
     * Options to specify the shape of a vertex as a rectangle.
     * 
     * @export
     * @interface RectangleOptions
     * @extends {HasBorder}
     * @extends {HasBackground}
     * @extends {Commons.HasWidthAndHeight}
     * @extends {Commons.HasRadius}
     */
    export interface RectangleOptions extends HasBorder, HasBackground, Commons.HasWidthAndHeight, Commons.HasRadius {
    }


    /**
     * Options to specify the shape of a vertex as an ellipse.
     * 
     * @export
     * @interface EllipseOptions
     * @extends {HasBorder}
     * @extends {HasBackground}
     * @extends {Commons.HasWidthAndHeight}
     */
    export interface EllipseOptions extends HasBorder, HasBackground, Commons.HasWidthAndHeight {
    }

    /**
     * Options to specify how the text of the vertex should be rendered.
     * 
     * @export
     * @interface TextOptions
     */
    export interface TextOptions {
    }
}

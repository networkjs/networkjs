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


    /**
     * Enum with default vertex types.
     * 
     * @export
     * @enum {number}
     */
    export enum ShapeType {
        CIRCLE,
        RECTANGLE,
        ELLIPSE,
        TRIANGLE
    }

    /**
     * Enum with default vertex states.
     * 
     * @export
     * @enum {number}
     */
    export enum States {
        DEFAULT,
        OVERED,
        SELECTED,
        DRAGGED
    }

    /**
     * Options to specify the shape of the vertex.
     * 
     * @export
     * @interface ShapeOptions
     */
    export interface ShapeOptions {
        /**
         * Shape options for the default state.
         * 
         * @type {Shape}
         * @memberOf ShapeOptions
         */
        default: Shape
        /**
         * Shape options for the overed state.
         * 
         * @type {Shape}
         * @memberOf ShapeOptions
         */
        overed?: Shape
        /**
         * Shape options for the dragged state.
         * 
         * @type {Shape}
         * @memberOf ShapeOptions
         */
        dragged?: Shape
        /**
         * Shape options for the selected state.
         * 
         * @type {Shape}
         * @memberOf ShapeOptions
         */
        selected?: Shape
        /**
         * Shape options for the overed + selected state.
         * 
         * @type {Shape}
         * @memberOf ShapeOptions
         */
        selected_overed?: Shape
        /**
         * Shape options for the dragged + selected state.
         * 
         * @type {Shape}
         * @memberOf ShapeOptions
         */
        selected_dragged?: Shape
    }

    /**
     * Options to specify the shape of the vertex.
     * 
     * @export
     * @interface Shape
     */
    export interface Shape {
        /**
         * The type of the shape. Example : circle.
         * 
         * @type {(string | ShapeType)}
         * @memberOf Shape
         */
        type: string | ShapeType
        /**
         * The assoicated options for the given shape.
         * 
         * @type {*}
         * @memberOf Shape
         */
        options: any
    }


    /**
     *  Options to specify the border of the Vertex when applicable
     * 
     * @export
     * @interface HasBorder
     */
    export interface HasBorder {
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
     * @export
     * @interface HasBackground
     */
    export interface HasBackground {
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
     * Options to specify the shape of a vertex as a triangle.
     * 
     * @export
     * @interface TriangleOptions
     * @extends {HasBorder}
     * @extends {HasBackground}
     * @extends {Commons.HasWidthAndHeight}
     */
    export interface TriangleOptions extends HasBorder, HasBackground, Commons.HasWidthAndHeight {
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

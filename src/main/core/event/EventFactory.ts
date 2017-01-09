import { Vertex } from "../Vertex"
import { Edge } from "../Edge"
import { Point } from "../Commons"
import { Layer } from "../Layer"
import { Renderer } from "../Renderer"
import { IsRenderable } from "../IsRenderable"
import { Model } from "../Model"


import { Event, EventName } from "./Event"

export class EventBuilder<T>{
    private _name: string | EventName
    private _source: any
    private _child: any
    private _renderable: IsRenderable
    private _vertex: Vertex
    private _edge: Edge
    private _position: Point
    private _rotation: number

    constructor(name: string | EventName) {
        this._name = name;
    }

    public withSource(source: T) {
        this._source = source;
        return this;
    }

    public withChild<T2>(child: T2) {
        this._child = child;
        return this;
    }

    public withRenderable(renderable: IsRenderable) {
        this._renderable = renderable;
        return this;
    };

    public withVertex(vertex: Vertex) {
        this._vertex = vertex;
        return this;
    };

    public withEdge(edge: Edge) {
        this._edge = edge;
        return this;
    };

    public withPosition(position: Point) {
        this._position = position;
        return this;
    };

    public withRotation(rotation: number) {
        this._rotation = rotation;
        return this;
    };

    public build(): Event<T> {
        let e: Event<T> = {
            name: this._name,
            data: {}
        };

        if (this._source)
            e.source = this._source;

        if (this._child)
            e.data.child = this._child;

        if (this._edge)
            e.data.edge = this._edge;

        if (this._position)
            e.data.position = this._position;

        if (this._renderable)
            e.data.renderable = this._renderable;

        if (this._rotation)
            e.data.rotation = this._rotation;

        if (this._vertex)
            e.data.vertex = this._vertex;

        return e;
    };


    public static createEvent<O>(eventName: EventName, source: O): EventBuilder<O> {
        return new EventBuilder<O>(eventName).withSource(source);
    }
   
}

// export class EventBuilderFactory {

//     private static create(name: EventName): any {

//         let builder: any = function (name: any) {
//             this.name = name;
//         }

//         builder.prototype.withSource = function (source: any) {
//             this.source = source;
//             return this;
//         };

//         builder.prototype.withChild = function withChild<T>(child: T) {
//             this.data = {} || this.data;
//             this.data.child = child;
//             return this;
//         };

//         builder.prototype.withRenderable = function (renderable: IsRenderable) {
//             this.data = {} || this.data;
//             this.data.renderable = renderable;
//             return this;
//         };

//         builder.prototype.withVertex = function (vertex: Vertex) {
//             this.data = {} || this.data;
//             this.data.vertex = vertex;
//             return this;
//         };

//         builder.prototype.withEdge = function (edge: Edge) {
//             this.data = {} || this.data;
//             this.data.edge = edge;
//             return this;
//         };

//         builder.prototype.withPosition = function (position: Point) {
//             this.data = {} || this.data;
//             this.data.position = position;
//             return this;
//         };

//         builder.prototype.withRotation = function (rotation: number) {
//             this.data = {} || this.data;
//             this.data.rotation = rotation;
//             return this;
//         };


//         builder.prototype.build = function () {
//             //Remove builder prototype methods from event 
//             return Object.assign({}, this);
//         };

//         return new builder(name);
//     }


//     public static createVertexEvent(eventName: EventName, source: Vertex): EventBuilder<Vertex> {
//         return this.create(eventName)
//             .withSource(source);
//     }

//     public static createEdgeDrawEvent(source: Edge): Event<Edge> {
//         return this.create(EventName.EDGE_DRAW)
//             .withSource(source)
//             .build();
//     }

//     public static createVertexRotateEvent(source: Vertex, rotation: number): EventBuilder<Vertex> {
//         return this.create(EventName.VERTEX_ROTATE)
//             .withSource(source)
//             .withRotation(rotation)
//             .build();
//     }

//     public static createLayerChildAddedEvent<T>(source: Layer<T>, child: T): Event<Layer<T>> {
//         return this.create(EventName.LAYER_CHILD_ADDED)
//             .withSource(source)
//             .withChild(child)
//             .build();
//     }

//     public static createLayerChildRemovedEvent<T>(source: Layer<T>, child: T): Event<Layer<T>> {
//         return this.create(EventName.LAYER_CHILD_REMOVED)
//             .withSource(source)
//             .withChild(child)
//             .build();
//     }

//     public static createRendererRenderEvent(source: Renderer, renderable: any): Event<Renderer> {
//         return this.create(EventName.RENDERER_RENDER)
//             .withSource(source)
//             .withRenderable(renderable)
//             .build();
//     }

//     public static createModelVertexCreatedEvent(source: Model, vertex: Vertex): Event<Model> {
//         return this.create(EventName.MODEL_VERTEX_CREATED)
//             .withSource(source)
//             .withVertex(vertex)
//             .build();
//     }

//     public static createModelEdgeCreatedEvent(source: Model, edge: Edge): Event<Model> {
//         return this.create(EventName.MODEL_EDGE_CREATED)
//             .withSource(source)
//             .withEdge(edge)
//             .build();
//     }

// }
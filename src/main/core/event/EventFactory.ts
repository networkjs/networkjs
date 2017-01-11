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
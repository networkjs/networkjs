import { Vertex } from "../Vertex"
import { Edge } from "../Edge"
import { Point } from "../Commons"
import { Layer } from "../Layer"
import { Renderer } from "../Renderer"
import { IsRenderable } from "../IsRenderable"
import { Model } from "../Model"


import { Event, EventName } from "./Event"


export class EventFactory {

    private static create(name: EventName): any {

        let builder: any = function (name: any) {
            this.name = name;
        }

        builder.prototype.withSource = function (source: any) {
            this.source = source;
            return this;
        };

        builder.prototype.withChild = function withChild<T>(child: T) {
            this.data = {} || this.data;
            this.data.child = child;
            return this;
        };

        builder.prototype.withRenderable = function (renderable: IsRenderable) {
            this.data = {} || this.data;
            this.data.renderable = renderable;
            return this;
        };

        builder.prototype.withVertex = function (vertex: Vertex) {
            this.data = {} || this.data;
            this.data.vertex = vertex;
            return this;
        };

        builder.prototype.withEdge = function (edge: Edge) {
            this.data = {} || this.data;
            this.data.edge = edge;
            return this;
        };

        // builder.prototype.withPosition = function (position: Point) {
        //     this.data = {} || this.data;
        //     this.data.position = position;
        //     return this;
        // };

        // builder.prototype.withRotation = function (rotation: number) {
        //     this.data = {} || this.data;
        //     this.data.rotation = rotation;
        //     return this;
        // };


        builder.prototype.build = function () {
            //Remove builder prototype methods from event 
            return Object.assign({}, this);
        };

        return new builder(name);
    }


    public static createVertexMoveEvent(source: Vertex): Event<Vertex> {
        return this.create(EventName.VERTEX_MOVE)
            .withSource(source)
            .build();
    }

    public static createVertexDrawEvent(source: Vertex): Event<Vertex> {
        return this.create(EventName.VERTEX_DRAW)
            .withSource(source)
            .build();
    }

    public static createEdgeDrawEvent(source: Edge): Event<Edge> {
        return this.create(EventName.EDGE_DRAW)
            .withSource(source)
            .build();
    }

    public static createVertexRotateEvent(source: Vertex): Event<Vertex> {
        return this.create(EventName.VERTEX_ROTATE)
            .withSource(source)
            .build();
    }

    public static createLayerChildAddedEvent<T>(source: Layer<T>, child: T): Event<Layer<T>> {
        return this.create(EventName.LAYER_CHILD_ADDED)
            .withSource(source)
            .withChild(child)
            .build();
    }

    public static createLayerChildRemovedEvent<T>(source: Layer<T>, child: T): Event<Layer<T>> {
        return this.create(EventName.LAYER_CHILD_REMOVED)
            .withSource(source)
            .withChild(child)
            .build();
    }

    public static createRendererRenderEvent(source: Renderer, renderable: any): Event<Renderer> {
        return this.create(EventName.RENDERER_RENDER)
            .withSource(source)
            .withRenderable(renderable)
            .build();
    }

    public static createModelVertexCreatedEvent(source: Model, vertex: Vertex): Event<Model> {
        return this.create(EventName.MODEL_VERTEX_CREATED)
            .withSource(source)
            .withVertex(vertex)
            .build();
    }

    public static createModelEdgeCreatedEvent(source: Model, edge: Edge): Event<Model> {
        return this.create(EventName.MODEL_EDGE_CREATED)
            .withSource(source)
            .withEdge(edge)
            .build();
    }

}
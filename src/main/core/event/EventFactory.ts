import { Event, EventName } from "./Event"
import { Point } from "../../core/Commons"
import { Layer } from "../../core/Layer"
import { Vertex } from "../Vertex"

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
            return Object.assign({}, this);
        };

        return new builder(name);
    }


    public static createVertexMoveEvent(source: Vertex): Event<Vertex> {
        return this.create(EventName.VERTEX_MOVE)
            .withSource(source)
            .build();
    }

    public static createVertexRenderEvent(source: Vertex): Event<Vertex> {
        return this.create(EventName.VERTEX_RENDER)
            .withSource(source)
            .build();
    }

    public static createVertexDrawEvent(source: Vertex): Event<Vertex> {
        return this.create(EventName.VERTEX_DRAW)
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


}
import { Event } from "Event"
import { Point } from "../../api/Commons"
import { Vertex } from "../Vertex"

export class EventFactory {

    private static create(name: string): any {

        let builder: any = function (name: any) {
            this.name = name;
        }

        builder.prototype.withSource = function (source: any) {
            this.source = source;
            return this;
        };

        builder.prototype.withPosition = function (position: Point) {
            this.data = {
                position: position
            };
            return this;
        };

        builder.prototype.build = function () {
            return Object.assign({}, this);
        };

        return new builder(name);
    }


    public static createVertexMoveEvent(position: Point, source: Vertex): Event<Vertex> {
        return this.create('VertexMove')
            .withSource(source)
            .withPosition(position)
            .build();
    }

    public static createVertexRenderEvent(source: Vertex): Event<Vertex> {
        return this.create('VertexRender')
            .withSource(source)
            .build();
    }

    
}
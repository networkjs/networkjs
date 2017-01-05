import { Event, EventName } from "../core/event/Event"
import { Vertex } from "../core/Vertex"
import { Point } from "../core/Commons"
import { VertexOptions } from "../api/VertexOptions"
import { displayObjectFactory } from "./DisplayObjectFactory"
import * as DRAW from "./VertexDrawers"
//import * as PIXI from "pixi.js"

import * as Rx from "rxjs/Rx"

export class VertexDelegate {
    private _subscription: Rx.Subscription
    private _displayObject: PIXI.DisplayObject
    //private _renderer: PIXI.WebGLRenderer

    constructor(vertex: Vertex,
        customDisplayObjectFactory?: (options: VertexOptions.Options) => PIXI.DisplayObject) {
        let doFactory = customDisplayObjectFactory || displayObjectFactory;
        this._displayObject = doFactory.call(this, vertex.getOptions());
        this._subscription = vertex.registerObserver(this);
    }

    public next(event: Event<Vertex>): void {
        if (!event || event.name === undefined)
            throw new Error('Event does not contain the name property');
        switch (event.name) {
            case EventName.VERTEX_MOVE:
                console.debug(`VERTEX_MOVE received`);
                this._move(event);
                break;
            case EventName.VERTEX_ROTATE:
                console.debug(`VERTEX_ROTATE received`);
                this._rotate(event);
                break;
            case EventName.VERTEX_RENDER:
                console.debug(`VERTEX_RENDER received`);
                this._render(event);
                break;
            case EventName.VERTEX_DRAW:
                console.debug(`VERTEX_DRAW received`);
                this._draw(event);
                break;
        }
    }


    private _move(event: Event<Vertex>) {
        let options = this._getSource(event).getOptions();
        let pos = options.position || { x: 0, y: 0 };
        this._displayObject.position = new PIXI.Point(pos.x, pos.y);
    }

    private _rotate(event: Event<Vertex>) {
        let options = this._getSource(event).getOptions();
        let rotation = options.rotation || 0;
        this._displayObject.rotation += rotation;
    }

    private _draw(event: Event<Vertex>) {
        let so = this._getShapeOptions(this._getSource(event));
        let drawer = DRAW.DrawersRegistry.getInstance().getDrawer(so.type);
        if (!drawer)
            throw new Error(`Could not find corresponding drawer ${so.type}`);

        drawer.call(this, event.source, this._displayObject);
    }

    private _getSource(event: Event<Vertex>): Vertex {
        if (event.source === undefined)
            throw new Error('Could not render vertex, undefined source');
        return event.source;
    }

    private _getShapeOptions(vertex: Vertex): VertexOptions.ShapeOptions {
        let options = vertex.getOptions()
        if (options.shapeOptions === undefined)
            throw new Error('Could not render vertex, undefined shapeoptions');
        return options.shapeOptions;
    }

    private _render(event: Event<Vertex>) {
    }

    public complete(): void {
        this._subscription.unsubscribe();
        console.debug('VertexDelegate released its subscription');
    }

    public error(e: any): void {
        throw new Error('Error sent from vertex observable' + e);
    }

    //TODO remove after tests
    public getDisplayObject(): PIXI.DisplayObject {
        return this._displayObject;
    }
}
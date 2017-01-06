import { VertexOptions } from "../api/VertexOptions"

import { Event, EventName, getSource } from "../core/event/Event"
import { Vertex } from "../core/Vertex"
import { Point } from "../core/Commons"

import { vertexDisplayObjectFactory } from "./VertexDisplayObjectFactory"
import { HasDisplayObject } from "./HasDisplayObject"
import * as DRAW from "./VertexDrawers"
//import * as PIXI from "pixi.js"

import * as Rx from "rxjs/Rx"

export class VertexDelegate implements HasDisplayObject {
    private _subscription: Rx.Subscription
    private _displayObject: PIXI.Container

    constructor(
        //shapeType: VertexOptions.ShapeType | string
        //,customDisplayObjectFactory?: (options: VertexOptions.Options) => PIXI.DisplayObject
        ) {
        // let doFactory = customDisplayObjectFactory || vertexDisplayObjectFactory;
        // this._displayObject = doFactory.call(this, shapeType);
        this._displayObject = new PIXI.Container();
    }

    public next(event: Event<Vertex>): void {
        if (!event || event.name === undefined)
            throw new Error('Event does not contain the name property');
        switch (event.name) {
            case EventName.VERTEX_MOVE:
                console.debug(`VERTEX_MOVE received`);
                this._onMove(event);
                break;
            case EventName.VERTEX_ROTATE:
                console.debug(`VERTEX_ROTATE received`);
                this._onRotate(event);
                break;
            case EventName.VERTEX_DRAW:
                console.debug(`VERTEX_DRAW received`);
                this._onDraw(event);
                break;
        }
    }

    private _onMove(event: Event<Vertex>) {
        let vertex: Vertex = getSource(event) 
        let pos = vertex.getPosition();
        this._displayObject.position = new PIXI.Point(pos.x, pos.y);
    }

    private _onRotate(event: Event<Vertex>) {
        let vertex: Vertex = getSource(event)
        let rotation = vertex.getRotation();
        this._displayObject.rotation += rotation;
    }

    private _onDraw(event: Event<Vertex>) {
        let vertex: Vertex = getSource(event)
        let so = this._getShapeOptions(vertex);
        let drawer = DRAW.VertexDrawerRegistry.getInstance().getDrawer(so.type);
        if (!drawer)
            throw new Error(`Could not find corresponding drawer for shapetype;${so.type}`);

        drawer.call(this, vertex.getOptions(), this._displayObject);
    }

    private _getShapeOptions(vertex: Vertex): VertexOptions.ShapeOptions {
        let options = vertex.getOptions()
        if (options.shapeOptions === undefined)
            throw new Error('shapeOptions is undefined');
        return options.shapeOptions;
    }

    public complete(): void {
        this._subscription.unsubscribe();
        console.debug('VertexDelegate released its subscription');
    }

    public error(e: any): void {
        throw new Error('Error sent from vertex observable' + e);
    }

    public getDisplayObject(): PIXI.DisplayObject {
        return this._displayObject;
    }
}
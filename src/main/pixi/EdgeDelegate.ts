import { EdgeOptions } from "../api/EdgeOptions"

import { Event, EventName, getSource } from "../core/event/Event"
import { Edge } from "../core/Edge"
import { Point } from "../core/Commons"
import { Model } from "../core/Model"

import { HasDisplayObject } from "./HasDisplayObject"
import * as DRAW from "./EdgeDrawers"
//import * as PIXI from "pixi.js"

import * as Rx from "rxjs/Rx"

export class EdgeDelegate implements HasDisplayObject {
    private _subscription: Rx.Subscription
    private _displayObject: PIXI.Container
    //private _renderer: PIXI.WebGLRenderer
    private _model: Model = Model.getInstance();

    constructor() {
        this._displayObject = new PIXI.Container();
    }

    public next(event: Event<Edge>): void {
        if (!event || event.name === undefined)
            throw new Error('Event does not contain the name property');
        switch (event.name) {
            case EventName.EDGE_DRAW:
                console.debug(`EDGE_DRAW received`);
                this._onDraw(event);
                break;
        }
    }

    private _onDraw(event: Event<Edge>) {
        this._displayObject.removeChildren();
        let edge: Edge = getSource(event)
        let so = this._getShapeOptions(edge);
        let drawer = DRAW.EdgeDrawerRegistry.getInstance().getDrawer(so.type);
        if (!drawer)
            throw new Error(`Could not find corresponding drawer for shapetype;${so.type}`);

        let from = this._model.getVertex(edge.getFromId());
        let to = this._model.getVertex(edge.getToId());

        drawer.call(this, edge.getOptions(), from.getPosition(), to.getPosition(), this._displayObject);
    }

    private _getShapeOptions(edge: Edge): EdgeOptions.ShapeOptions {
        let options = edge.getOptions()
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
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
    private _vertex: Vertex
    private _interactionData: PIXI.interaction.InteractionData
    private _deltaPosition: Point

    constructor(vertex: Vertex
        //shapeType: VertexOptions.ShapeType | string
        //,customDisplayObjectFactory?: (options: VertexOptions.Options) => PIXI.DisplayObject
    ) {
        // let doFactory = customDisplayObjectFactory || vertexDisplayObjectFactory;
        // this._displayObject = doFactory.call(this, shapeType);
        this._displayObject = new PIXI.Container();
        this._displayObject.interactive = true;
        this._displayObject.buttonMode = true;

        this._vertex = vertex;

        var v = this;

        v._displayObject
            .on('mousedown', function (event: PIXI.interaction.InteractionEvent) { v._onDragStart(event) })
            .on('touchstart', function (event: PIXI.interaction.InteractionEvent) { v._onDragStart(event) })

            .on('mouseup', function () { v._onDragEnd() })
            .on('mouseupoutside', function () { v._onDragEnd() })
            .on('touchend', function () { v._onDragEnd() })
            .on('touchendoutside', function () { v._onDragEnd() })

            .on('mousemove', function () { v._onDragMove() })
            .on('touchmove', function () { v._onDragMove() })

            // .on('mouseover', function () { v._onMouseOver(v) })
            // .on('mouseout', function () { v._onMouseOut(v) })
            ;
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
        //let vertex: Vertex = getSource(event)
        let pos = this._vertex.getPosition();
        this._displayObject.position = new PIXI.Point(pos.x, pos.y);
    }

    private _onRotate(event: Event<Vertex>) {
        //let vertex: Vertex = getSource(event)
        let rotation = this._vertex.getRotation();
        this._displayObject.rotation += rotation;
    }

    private _onDraw(event: Event<Vertex>) {
        //let vertex: Vertex = getSource(event)
        this._displayObject.removeChildren();
        let so = this._getShapeOptions(this._vertex);
        let drawer = DRAW.VertexDrawerRegistry.getInstance().getDrawer(so.type);
        if (!drawer)
            throw new Error(`Could not find corresponding drawer for shapetype;${so.type}`);

        drawer.call(this, this._vertex.getOptions(), this._displayObject);
    }

    private _onDragStart(event: PIXI.interaction.InteractionEvent) {
        //Get mouse position on vertex graphics
        this._interactionData = event.data;
        let dx = this._interactionData.getLocalPosition(this._displayObject).x;
        let dy = this._interactionData.getLocalPosition(this._displayObject).y;
        this._deltaPosition = { x: dx, y: dy };

        this._vertex.startDrag(this._deltaPosition);
    }

    private _onDragEnd() {
        this._vertex.endDrag();
    }

    private _onDragMove() {
        if (this._vertex.isDragged()) {
            var newPosition = this._interactionData.getLocalPosition(this._displayObject.parent);
            let newX = newPosition.x - this._deltaPosition.x;
            let newY = newPosition.y - this._deltaPosition.y;

            this._vertex.move({ x: newX, y: newY });
        }
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
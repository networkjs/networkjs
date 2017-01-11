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
    private _downTimestamp : number
    private _dragStarted : boolean

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
            
            
            
            .on('mouseupoutside', function (event: PIXI.interaction.InteractionEvent) { v.release(event) })
            .on('touchend', function (event: PIXI.interaction.InteractionEvent) { v.release(event) })
            .on('touchendoutside', function (event: PIXI.interaction.InteractionEvent) { v.release(event) })
            .on('mouseup', function (event: PIXI.interaction.InteractionEvent) { v.release(event) })

            .on('mousemove', function () { v.move() })
            .on('touchmove', function () { v.move() })

            .on('mouseover', function () { v._onMouseOver() })
            .on('mouseout', function () { v._onMouseOut() })

            .on('touchstart', function (event: PIXI.interaction.InteractionEvent) { v.acquire(event) })          
            .on('mousedown', function (event: PIXI.interaction.InteractionEvent) { v.acquire(event) })        
            
            
            
            .on('tap', function (event: PIXI.interaction.InteractionEvent) { v.click(event) })
            ;
    }

    public next(event: Event<Vertex>): void {
        if (!event || event.name === undefined)
            throw new Error('Event does not contain the name property');
        switch (event.name) {
            case EventName.VERTEX_MOVE:
                //console.debug(`VERTEX_MOVE received`);
                this._onMove(event);
                break;
            case EventName.VERTEX_ROTATE:
                //console.debug(`VERTEX_ROTATE received`);
                this._onRotate(event);
                break;
            case EventName.VERTEX_DRAW:
                //console.debug(`VERTEX_DRAW received`);
                this._onDraw(event);
                break;
            // case EventName.VERTEX_SELECT_START:
            //     console.info(`VERTEX_SELECT_START received`);
            //     break;
            // case EventName.VERTEX_SELECT_END:
            //     console.info(`VERTEX_SELECT_END received`);
            //     break;
            // case EventName.VERTEX_OVER_START:
            //     console.info(`VERTEX_OVER_START received`);   
            //     break;
            // case EventName.VERTEX_OVER_END:
            //     console.info(`VERTEX_OVER_END received`);     
            //     break;
        }
    }

    private _onMove(event: Event<Vertex>) {
        let pos = this._vertex.getPosition();
        this._displayObject.position = new PIXI.Point(pos.x, pos.y);
    }

    private _onRotate(event: Event<Vertex>) {
        let rotation = this._vertex.getRotation();
        this._displayObject.rotation += rotation;
    }

    private _onDraw(event: Event<Vertex>) {
        this._draw(this._vertex.getStateShape());
    }

    private _draw(shape: VertexOptions.Shape) {
        console.debug('_Draw');
        let drawer = DRAW.VertexDrawerRegistry.getInstance().getDrawer(shape.type);
        if (!drawer)
            throw new Error(`Could not find corresponding drawer for shapetype;${shape.type}`);

        drawer.call(this,
            this._vertex.getPosition(),
            this._vertex.getRotation(),
            shape.options,
            this._displayObject);
    }

    private _startDrag(event: PIXI.interaction.InteractionEvent) {
        this._vertex.startDrag(this._deltaPosition);
        //re-render on move only
        //Get mouse position on vertex graphics
        this._interactionData = event.data;
        let dx = this._interactionData.getLocalPosition(this._displayObject).x;
        let dy = this._interactionData.getLocalPosition(this._displayObject).y;
        this._deltaPosition = { x: dx, y: dy };
        console.debug('Drag start');
    }

    private endDrag() {
        this._vertex.endDrag();
        this._dragStarted = false;
        this._draw(this._vertex.getStateShape());
        console.debug('Drag end');
    }

    private move() {
        if (this._vertex.isDragged()) {
            
            var newPosition = this._interactionData.getLocalPosition(this._displayObject.parent);
            let newX = newPosition.x - this._deltaPosition.x;
            let newY = newPosition.y - this._deltaPosition.y;

            this._vertex.move({ x: newX, y: newY });
            if (!this._dragStarted)
                this._draw(this._vertex.getStateShape());
            this._dragStarted = true;
        }
    }

    private _onMouseOver() {
        this._vertex.startOver();
        this._draw(this._vertex.getStateShape());
        console.debug('Over');
    }

    private _onMouseOut() {
        this._vertex.endOver();
        this._draw(this._vertex.getStateShape());
        console.debug('Out');
    }

    private acquire(event: PIXI.interaction.InteractionEvent) {
        this._downTimestamp = event.data.originalEvent.timeStamp;
        this._startDrag(event);
    }

    private release(event: PIXI.interaction.InteractionEvent) {
        let d = event.data.originalEvent.timeStamp - this._downTimestamp < 200
        this.endDrag();
        if (d)
            this.click(event);
    }

    private click(event: PIXI.interaction.InteractionEvent) {
        console.debug('Click');
        if (this._vertex.isSelected())
            this._vertex.unselect();
        else
            this._vertex.select();
        this._draw(this._vertex.getStateShape());
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
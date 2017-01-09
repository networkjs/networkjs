import { Event, EventName, getSource } from "../core/event/Event"
import { Renderer } from "../core/Renderer"
import { DelegationRegistry } from "../core/DelegationRegistry"

import { HasDisplayObject } from "./HasDisplayObject"

import * as Rx from "rxjs/Rx"

export class RendererDelegate {
    private _subscription: Rx.Subscription
    private _registry: DelegationRegistry = DelegationRegistry.getInstance();
    private _renderer: PIXI.WebGLRenderer;

    constructor(width: number, height: number, containerSelector: string) {
        this._renderer = new PIXI.WebGLRenderer(width, height, {
            antialias: true,
            transparent: true,
            resolution: 1
        });

        document.querySelector(containerSelector).appendChild(this._renderer.view);
    }

    public next(event: Event<Renderer>): void {
        if (!event || event.name === undefined)
            throw new Error('Event does not contain the name property');
        switch (event.name) {
            case EventName.RENDERER_RENDER:
                console.debug(`RENDERER_RENDER received`);
                this._onRender(event);
                break;
        }
    }

    private _onRender(event: Event<Renderer>) {
        let renderable = event.data.renderable;
        //cast to any to avoid compilation issue with getDisplayObject, thx Js
        let delegate: any = this._registry.getDelegate(renderable);
        this._renderer.render(delegate.getDisplayObject());
    }
    
    public complete(): void {
        this._subscription.unsubscribe();
        console.debug('Renderer released its subscription');
    }

    public error(e: any): void {
        throw new Error('Error sent from renderer observable' + e);
    }
}
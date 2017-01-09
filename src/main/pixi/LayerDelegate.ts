import { Event, EventName, getSource } from "../core/event/Event"
import { Layer } from "../core/Layer"
import { DelegationRegistry } from "../core/DelegationRegistry"

import { HasDisplayObject } from "./HasDisplayObject"

import * as Rx from "rxjs/Rx"

export class LayerDelegate implements HasDisplayObject {
    private _subscription: Rx.Subscription
    private _container: PIXI.Container = new PIXI.Container();
    private _registry:DelegationRegistry = DelegationRegistry.getInstance();

    public next(event: Event<Layer<any>>): void {
        if (!event || event.name === undefined)
            throw new Error('Event does not contain the name property');
        switch (event.name) {
            case EventName.LAYER_CHILD_ADDED:
                console.debug(`LAYER_CHILD_ADDED received`);
                this._onChildAdded(event);
                break;
            case EventName.LAYER_CHILD_REMOVED:
                console.debug(`LAYER_CHILD_REMOVED received`);
                this._onChildRemoved(event);
                break;
        }
    }

    private _onChildAdded(event: Event<Layer<any>>) {
        let child = event.data.child;
        //cast to any to avoid compilation issue with getDisplayObject, thx Js
        let childDelegate:any = this._registry.getDelegate(child);
        this._container.addChild(childDelegate.getDisplayObject());
    }

    private _onChildRemoved(event: Event<Layer<any>>) {
        let child = event.data.child;
        //cast to any to avoid compilation issue with getDisplayObject, thx Js
        let childDelegate:any = this._registry.getDelegate(child);
        this._container.removeChild(childDelegate.getDisplayObject());
    }

    public complete(): void {
        this._subscription.unsubscribe();
        console.debug('Layer released its subscription');
    }

    public error(e: any): void {
        throw new Error('Error sent from layer observable' + e);
    }

    public getDisplayObject(): PIXI.Container {
        return this._container;
    }
}
import { AbstractHasSubject } from "./AbstractHasSubject"
import { Layer } from "./Layer"

import * as Rx from "rxjs/Rx"

export class DelegationRegistry {
    private _registry: Map<AbstractHasSubject, Rx.Observer<any>> = new Map()

    private static _instance: DelegationRegistry = new DelegationRegistry();

    constructor() {
        if (DelegationRegistry._instance) {
            throw new Error("Error: Instantiation failed: Use DelegationRegistry.getInstance() instead of new.");
        }
        DelegationRegistry._instance = this;
    }

    public static getInstance(): DelegationRegistry {
        return DelegationRegistry._instance;
    }

    public addDelegate(hasSubject: AbstractHasSubject, delegate: Rx.Observer<any>): void {
        hasSubject.registerObserver(delegate);
        this._registry.set(hasSubject, delegate);
    }

    public getDelegate(hasSubject: AbstractHasSubject): Rx.Observer<any> {
        let out = this._registry.get(hasSubject);
        if (out === undefined)
            throw new Error('Could not find corresponding delegate in registry');
        return out;
    }

}
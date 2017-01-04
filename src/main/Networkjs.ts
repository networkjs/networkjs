import { GraphOptions } from "./api/GraphOptions"
import { Vertex } from "./core/Vertex"
import * as Commons from "./api/Commons"


export class Networkjs {

    constructor(options: GraphOptions, renderingContext?: any) {
        console.log('Network created');
    }

    public next(e: any) {
        console.log('from network : ' + e);
    }

    public error(e: any) {
        console.log('from network error : ' + e);
    }

    public complete() {
        console.log('from network complete');
    }

    public start() {
        let v = new Vertex();
        v.subscribe(this);
        v.move({ x: 15, y: 15 });

        let p = v.getCenter();
        console.log(p.x);
    }
}
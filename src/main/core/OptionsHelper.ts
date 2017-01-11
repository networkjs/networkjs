import { VertexOptions } from "../api/VertexOptions"
import { ShapeOptionsRegistry } from "./ShapeOptionsRegistry"
declare const _: any;


export function getOptions(count: number, customOptions?: VertexOptions.Options): VertexOptions.Options {
    let shapeType = customOptions && customOptions.shapeOptions ? customOptions.shapeOptions.default.type : VertexOptions.ShapeType.CIRCLE;
    let defOptions: VertexOptions.ShapeOptions = ShapeOptionsRegistry.getInstance().getOptions(shapeType);

    let shapeOptions: VertexOptions.ShapeOptions = _.merge({}, defOptions); //copy options object

    if (customOptions && customOptions.shapeOptions) {
        let userOp = customOptions.shapeOptions;
        _.merge(shapeOptions.default, userOp.default);
        _.merge(shapeOptions.dragged, userOp.dragged);
        _.merge(shapeOptions.overed, userOp.overed);

        _.merge(shapeOptions.selected, userOp.selected);
        _.merge(shapeOptions.selected_dragged, userOp.dragged, userOp.selected, userOp.selected_dragged);
        _.merge(shapeOptions.selected_overed, userOp.overed, userOp.selected, userOp.selected_overed);
    }

    let id = customOptions ? customOptions.id : `Vertex ${count}`;
    let label = customOptions ? customOptions.label : `Label for Vertex ${id}`;
    let position = customOptions && customOptions.position ? customOptions.position : { x: 0, y: 0 };
    let rotation = customOptions && customOptions.rotation ? customOptions.rotation : 0;
    let textOptions = customOptions && customOptions.textOptions ? customOptions.textOptions : {};

    return {
        id: id,
        label: label,
        position: position, //center
        rotation: rotation,
        shapeOptions: shapeOptions,
        textOptions: textOptions
    };
}
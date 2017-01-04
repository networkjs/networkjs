import {VertexOptions} from "./VertexOptions"
import {EdgeOptions} from "./EdgeOptions"

/**
 * Options to pass to the graph constructor to build a new network graph.
 * 
 * @export
 * @interface GraphOptions
 */
export interface GraphOptions {
  /**
   * The optional width of the graph.
   * 
   * @type {number}
   * @memberOf GraphOptions
   */
  width?: number,

  /**
   * The optional height of the graph.
   * 
   * @type {number}
   * @memberOf GraphOptions
   */
  height?: number,
  
  /**
   * An array of vertices (nodes).
   * 
   * @type {Vertex[]}
   * @memberOf GraphOptions
   */
  vertices: VertexOptions.Options[],
  
  /**
   * An array of edges (relations).
   * 
   * @type {Edge[]}
   * @memberOf GraphOptions
   */
  edges: EdgeOptions.Options[]
}
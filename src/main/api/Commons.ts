export interface Position {  
    x: number
    y: number
}

export interface HasRadius {
    radius: number
}

export interface HasWidth {
    width: number
}

export interface HasHeight {
    height: number
}

export interface HasWidthAndHeight extends HasWidth, HasHeight {
}

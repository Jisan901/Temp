import {Vector2} from "./Vectors.js";

/**
 * @class Matrix
 * @description just for multiplication
 * @param {number[][]} matArray - matrix elements array
 * @property {number[][]} - matrix elements array
 * @property {number} cols - readonly number of columns
 * @property {number} rows - readonly number of rows
 * @example const matrix = new Matrix([
 * [1,2,3],
 * [1,2,3]
 * ]);
 */
export class Matrix {
    public numberArray : number[][];
    readonly cols : number;
    readonly rows : number;
    constructor(matArray : number[][]) {
        this.numberArray = matArray;
        this.rows = this.numberArray.length;
        this.cols = this.numberArray[0].length;
    }
    /**
    * multiply matrices by per column of 2nd matrix.
    * @param {Matrix} mat - Matrix for multiplication
    * @return {Matrix}
    */
    public multiply(mat : Matrix) : Matrix {
        if (mat.rows === this.cols) {
            let newMat : number[][] = [];
            for (let c2 = 0; c2 < mat.cols; c2++) {
                for (let i = 0; i < this.rows; i++) {
                    let row : number[] = this.numberArray[i];
                    let sum : number = 0;
                    for (let j = 0; j < this.cols; j++) {
                        let elm1 : number = this.numberArray[i][j];
                        let elm2 : number = mat.numberArray[j][c2];
                        sum += elm2*elm1;
                    }
                    newMat[i]? undefined : newMat[i]=[];
                    newMat[i][c2] = sum;
                }
            }
            return new Matrix(newMat);
        }
        else throw new Error("can't apply multiply algorithm.");
        
    }
    /**
     * returns flatten float 32bit array 
     * @return {Matrix}
     */
    public toFloat32Array(): Float32Array {
        let arr = [];
        for (let i = 0; i < this.numberArray.length; i++) {
            arr.push(...this.numberArray[i]);
        }
        return new Float32Array(arr);
    }
    /**
    * getter for transposed matrix
    * @return {Matrix}
    */
    public get T() : Matrix {
        let transposed : number[][]  = [];
        for (let i = 0; i < this.cols; i++) {
            transposed[i] = [];
            for (let j = 0; j < this.rows; j++) {
                transposed[i][j] = this.numberArray[j][i];
            }
        }
        return new Matrix(transposed);
    }
    /**
     * Identity
     */
    public static Identity(rows: number, cols: number){
        let matrix = new Array(rows).fill(null).map(() => new Array(cols).fill(0));
        for (let i = 0; i < rows && i < cols; i++) {
            matrix[i][i] = 1;
        }
        return new Matrix(matrix);
    }
}

 /**
 * @class Transform2D
 * @description for 2d transform operation
 * @param {number[][]} matArray - matrix elements array
 * @property {number[][]} - matrix elements array
 * @property {number} cols - readonly number of columns
 * @property {number} rows - readonly number of rows
 * @example const transform = new Transform2D([
 * [1,2,3,4],
 * [1,2,3,4],
 * [1,2,3,4],
 * [1,2,3,4]
 * ]);
 */
class Transform2D extends Matrix{
    public position: Vector2;
    public rotation: number;
    public scale: Vector2;
    constructor(matArray : number[][]) {
        super(matArray)
        if (this.cols!=4 && this.rows != 4) {
            throw new Error("4x4 only supported");
        }
        this.position = new Vector2(0,0);
        this.scale = new Vector2(0,0);
        this.rotation = 0;
    }
    /**
    * translate
    */
    public static createTranslate(px: number, py: number) {
        return new Matrix([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [px, py, 0, 1]
        ]);
    }
    /**
    * rotate
    */
    public static createRotate(theta : number) {
        const cosTheta : number = Math.cos(theta);
        const sinTheta : number = Math.sin(theta);
        return new Matrix([
            [cosTheta, -sinTheta, 0, 0],
            [sinTheta,  cosTheta, 0, 0],
            [0,         0,        1, 0],
            [0,         0,        0, 1]
        ]);
    }
    /**
    * scale
    */
    public static createScale(sx: number, sy: number) {
        return new Matrix([
            [sx, 0, 0, 0],
            [0, sy, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    }
    /**
     * get transform
     */
    public get Transform():Matrix{
        const T = Transform2D.createTranslate(this.position.x,this.position.y);
        const S = Transform2D.createScale(this.scale.x, this.scale.y);
        const R = Transform2D.createRotate(this.rotation);
        return T.multiply(R.multiply(S));
    }
}
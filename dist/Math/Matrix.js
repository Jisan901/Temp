import { Vector2 } from "./Vectors.js";
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
    constructor(matArray) {
        this.numberArray = matArray;
        this.rows = this.numberArray.length;
        this.cols = this.numberArray[0].length;
    }
    /**
    * multiply matrices by per column of 2nd matrix.
    * @param {Matrix} mat - Matrix for multiplication
    * @return {Matrix}
    */
    multiply(mat) {
        if (mat.rows === this.cols) {
            let newMat = [];
            for (let c2 = 0; c2 < mat.cols; c2++) {
                for (let i = 0; i < this.rows; i++) {
                    let row = this.numberArray[i];
                    let sum = 0;
                    for (let j = 0; j < this.cols; j++) {
                        let elm1 = this.numberArray[i][j];
                        let elm2 = mat.numberArray[j][c2];
                        sum += elm2 * elm1;
                    }
                    newMat[i] ? undefined : newMat[i] = [];
                    newMat[i][c2] = sum;
                }
            }
            return new Matrix(newMat);
        }
        else
            throw new Error("can't apply multiply algorithm.");
    }
    /**
     * returns flatten float 32bit array
     * @return {Matrix}
     */
    toFloat32Array() {
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
    get T() {
        let transposed = [];
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
    static Identity(rows, cols) {
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
class Transform2D extends Matrix {
    constructor(matArray) {
        super(matArray);
        if (this.cols != 4 && this.rows != 4) {
            throw new Error("4x4 only supported");
        }
        this.position = new Vector2(0, 0);
        this.scale = new Vector2(0, 0);
        this.rotation = 0;
    }
    /**
    * translate
    */
    static createTranslate(px, py) {
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
    static createRotate(theta) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
        return new Matrix([
            [cosTheta, -sinTheta, 0, 0],
            [sinTheta, cosTheta, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]);
    }
    /**
    * scale
    */
    static createScale(sx, sy) {
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
    get Transform() {
        const T = Transform2D.createTranslate(this.position.x, this.position.y);
        const S = Transform2D.createScale(this.scale.x, this.scale.y);
        const R = Transform2D.createRotate(this.rotation);
        return T.multiply(R.multiply(S));
    }
}
//# sourceMappingURL=Matrix.js.map
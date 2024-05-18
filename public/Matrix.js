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
class Matrix {
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
    toFloat32Array(){
        let arr = [];
        for (let i = 0; i < this.numberArray.length; i++) {
            arr.push(...this.numberArray[i]);
        }
        return new Float32Array(arr);
    }
}
//# sourceMappingURL=Matrix.js.map



function createOrthoMat4(aspectRatio, near, far){
    let left, right, bottom, top;
    if (aspectRatio > 1) {
        // Wider than tall
        left = -aspectRatio;
        right = aspectRatio;
        bottom = -1;
        top = 1;
    } else {
        // Taller than wide
        left = -1;
        right = 1;
        bottom = -1 / aspectRatio;
        top = 1 / aspectRatio;
    }
    /// orthographic projection matrix
    
    return new Matrix([
        [2 / (right - left),                      0,                      0,          -(right + left) / (right - left)],
        [                  0,    2 / (top - bottom),                      0,          -(top + bottom) / (top - bottom)],
        [                  0,                     0,      -2 / (far - near),              -(far + near) / (far - near)],
        [                  0,                     0,                      0,                                         1]
        ]);
}
function createIdentityMat4(){
    return new Matrix([
        [1,  0,  0,  0],
        [0,  1,  0,  0],
        [0,  0,  1,  0],
        [0,  0,  0,  1],
        ]);
}
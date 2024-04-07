function createMatrix() {
    let rows = document.getElementById("rows").value;
    let cols = document.getElementById("cols").value;
    let matrixInputs = document.getElementById("matrixInputs");
    matrixInputs.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("id", `M${i}${j}`);
            matrixInputs.appendChild(input);
        }
        matrixInputs.appendChild(document.createElement("br"));
    }
}

function getMatrixValues(rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push([]);
        for (let j = 0; j < cols; j++) {
            matrix[i].push(Number(document.getElementById(`M${i}${j}`).value));
        }
    }
    return matrix;
}

function addMatrices() {
    let rows = document.getElementById("rows").value;
    let cols = document.getElementById("cols").value;
    let matrix1 = getMatrixValues(rows, cols);
    let matrix2 = getMatrixValues(rows, cols);
    let result = document.getElementById("result");
    let sum = [];
    for (let i = 0; i < rows; i++) {
        sum.push([]);
        for (let j = 0; j < cols; j++) {
            sum[i].push(matrix1[i][j] + matrix2[i][j]);
        }
    }
    result.textContent = "Result: " + JSON.stringify(sum);
}

function subtractMatrices() {
    let rows = document.getElementById("rows").value;
    let cols = document.getElementById("cols").value;
    let matrix1 = getMatrixValues(rows, cols);
    let matrix2 = getMatrixValues(rows, cols);
    let result = document.getElementById("result");
    let difference = [];
    for (let i = 0; i < rows; i++) {
        difference.push([]);
        for (let j = 0; j < cols; j++) {
            difference[i].push(matrix1[i][j] - matrix2[i][j]);
        }
    }
    result.textContent = "Result: " + JSON.stringify(difference);
}

function multiplyMatrices() {
    let rows1 = document.getElementById("rows").value;
    let cols1 = document.getElementById("cols").value;
    let rows2 = cols1; // Number of columns in matrix1 should be equal to number of rows in matrix2
    let cols2 = document.getElementById("cols").value;
    let matrix1 = getMatrixValues(rows1, cols1);
    let matrix2 = getMatrixValues(rows2, cols2);
    let result = document.getElementById("result");
    let product = [];
    for (let i = 0; i < rows1; i++) {
        product.push([]);
        for (let j = 0; j < cols2; j++) {
            let sum = 0;
            for (let k = 0; k < cols1; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            product[i].push(sum);
        }
    }
    result.textContent = "Result: " + JSON.stringify(product);
}
function determinant(matrix) {
    if (matrix.length !== matrix[0].length) {
        return "Matrix must be square to calculate determinant.";
    }

    if (matrix.length === 1) {
        return matrix[0][0];
    }

    if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    let det = 0;
    for (let i = 0; i < matrix.length; i++) {
        let submatrix = [];
        for (let j = 1; j < matrix.length; j++) {
            let row = [];
            for (let k = 0; k < matrix.length; k++) {
                if (k !== i) {
                    row.push(matrix[j][k]);
                }
            }
            submatrix.push(row);
        }
        det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(submatrix);
    }

    return det;
}

function findDeterminant() {
    let rows = document.getElementById("rows").value;
    let cols = document.getElementById("cols").value;
    let matrix = getMatrixValues(rows, cols);
    let result = document.getElementById("result");
    let det = determinant(matrix);
    result.textContent = "Determinant: " + det;
}

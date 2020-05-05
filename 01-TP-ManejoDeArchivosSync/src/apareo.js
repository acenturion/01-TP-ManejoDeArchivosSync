/**
 * toma dos arrays de números ordenados y en forma eficiente los combina en uno solo, aún ordenado
 * @param {number[]} arrA un array de números ordenados
 * @param {number[]} arrB otro array de números ordenados
 * @returns {number[]} un nuevo array de números ordenados
 */
function combinarDosArrays(arrA, arrB) {
    let result = arrA.concat(arrB);

    result = result.filter((v,i) => result.indexOf(v) === i)

    return result.sort((a, b) => a - b);
}

/**
 * toma un array de muchos arrays de números ordenados y los combina en uno solo, aún ordenado
 * @param {number[][]} arrs el array de arrays de números que quiero combinar
 * @returns {nuber[]} el nuevo array de números ordenados
 */
function combinarNArrays(arrs) {
    let res = [];

    for (let i = arrs.length; i > 0; i--) {
        res = res.concat(arrs.pop());
    }
    
    res = res.filter((v,i) => res.indexOf(v) === i)

    return res.sort((a, b) => a - b);
}

// exportar ambas funciones
export {
    combinarDosArrays,
    combinarNArrays
}
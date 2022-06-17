import * as RandomWrapper from "./dependencies/RandomWrapper.js"


function GetVarSeed(seed, add, coeff){
    return (seed + add)*coeff;
}

export function GetVarWrapper(seed, varSeed, add, coeff){
    return new RandomWrapper.RandomWrapper(seed + (varSeed+add)*coeff);
}

export const intRangeLambda = (rangeMin, rangeMax) => {
    return {
        rangeMin: rangeMin,
        rangeMax: rangeMax
    }
}


/**
 * This mutates the input array!
 * 
 * Don't use this, not tested
 * 
 * @param {Array<Object>} objectArr 
 * @param {string} param
 * @param {RandomWrapper.RandomWrapper} randomWrapper
 */
 export function ShufflePool(objectArr, param, randomWrapper){
    throw new Error('not yet implemented!');
    if (objectArr.length === 0){
        throw new Error("objectArr must be an arr of length > 0 !");
    }
    if (!(param in objectArr[0])){
        throw new Error("param needs to be a key of objectArr[ith]!");
    }

    const newIndices = ShuffleIndices(objectArr, randomWrapper);
    let j = 0;
    for (let i = 0; i < objectArr.length; i += 1){
        j = newIndices[i];
        const temp = objectArr[j][param];

        objectArr[j][param] = objectArr[i][param];
        objectArr[i][param] = temp;
    }
    //
}

/**
 * 
 * 
 * @param {Array<Object>} objectArr 
 * @param {string} param
 * @param {RandomWrapper.RandomWrapper} randomWrapper
 */
 export function ShufflePoolPure(objectArr, param, randomWrapper){
    if (objectArr.length === 0){
        throw new Error("objectArr must be an arr of length > 0 !");
    }
    if (!(param in objectArr[0])){
        throw new Error("param needs to be a key of objectArr[ith]!");
    }


    let j = 0;
    const length = objectArr.length;
    const newValues = objectArr.map( o => o[param]);
    for (let i = 0; i < length-1; i += 1){
        j = randomWrapper.randInt(0, length-1)
        const temp = newValues[j];

        newValues[j] = newValues[i];
        newValues[i] = temp;
    }
    
    return newValues;
}


export function RandomizePoolTotalPure(objectArr, seed, varSeed=0, add=0, coeff=0){
    if(objectArr.length === 0){
        throw Error('objectArr must be an array of length greater than 0!');
    }
    const randomWrapper = new RandomWrapper.RandomWrapper(seed+(varSeed+add)*coeff);

    //
    let cur = null;
    const newValues = [];
    for(let i = 0; i < objectArr.length; i += 1){
        cur = objectArr[i];
        newValues.push(randomWrapper.randInt(cur.rangeMin, cur.rangeMax));
    }

    return newValues;
}

export function MultiplyPoolConstantPure(objectArr, param, multiplier, seed, varSeed=0, add=0, coeff=0){
    const multiplyRange = [multiplier, multiplier];
    return MultiplyPoolPure(objectArr, param, multiplyRange, seed, varSeed, add, coeff);
}

export function MultiplyPoolPure(objectArr, param, multiplyRange=[1, 1.5], seed, varSeed=0, add=0, coeff=0, round=true){
    if(objectArr.length === 0){
        throw new Error('objectArr must be an array of length greater than 0!');
    }
    if(!(param in objectArr[0])){
        throw new Error("objects must have key (param)!");
    }

    const randomWrapper = new RandomWrapper.RandomWrapper(seed+(varSeed+add)*coeff);

    let cur = null;
    let newValue = null;
    const newValues = [];
    for(let i = 0; i < objectArr.length; i += 1){
        cur = objectArr[i];
        newValue = cur[param]*randomWrapper.random(multiplyRange[0], multiplyRange[1]);
        if (round){
            newValue = Math.round(newValue);
        }
        newValues.push(newValue);
    }

    return newValues;
}

/**
 * 
 * @param {*} objectArr 
 * @param {RandomWrapper.RandomWrapper} randomWrapper 
 */
export function RandomizePool(objectArr, randomWrapper){
    for(let i = 0; i < objectArr.length; i += 1){
        randomWrapper
    }   
}

export function RandomizePoolPure(objectArr, randomWrapper){

}
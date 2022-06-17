import * as Main from "./main.js";
import * as RandomWrapper from "./dependencies/RandomWrapper.js";
//import {jest} from '@jest/globals';
import { expect, test, describe, beforeAll, beforeEach, it, jest } from "@jest/globals";

test('adds 1 + 2 to equal 3', () => {
    expect(1).toBe(1);
  });

test ('test that multiply pools works', () => {
    //
    const mockObj1 = {value: 3};
    const mockObj2 = {value: 4};
    const mockObj3 = {value: 5};

    const param = "value";

    const objArr = [mockObj1, mockObj2, mockObj3];

    expect( Main.MultiplyPoolConstantPure(objArr, param, 2, 3)).toEqual(
        [6, 8, 10]
    );

    const result = Main.MultiplyPoolPure(objArr, param, [1, 2], 3);
    expect( Math.max(...result) ).toBeLessThanOrEqual(10);
    
});

test('test that shuffle pure works', () => {
    const mockObj1 = {value: 3};
    const mockObj2 = {value: 4};
    const mockObj3 = {value: 5};

    const values = [3, 4, 5];

    const objArr = [mockObj1, mockObj2, mockObj3];

    const randomWrapper = new RandomWrapper.RandomWrapper(106);

    const result = Main.ShufflePoolPure(objArr, "value", randomWrapper);

    expect( result ).toBeTruthy();

    console.log(result);


    for(let i = 0; i < 3; i += 1){
        const curValue = values[i];

        expect( result.includes(curValue) ).toBeTruthy();
    }
});

test('test that functions throw exceptions', () => {
    const objArr = [];
    

    expect( 
      ()=>Main.MultiplyPoolPure(objArr, param, [0, 0], 3)
    ).toThrow('objectArr must be an array of length greater than 0!');

    expect(
      ()=>Main.RandomizePoolTotalPure(objArr, param, [0, 0], 3).toThrow(
        'objectArr must be an array of length greater than 0!'
      )
    );

    const mockObj = {};
    objArr.push(mockObj);
    expect(
        ()=>Main.RandomizePoolTotalPure(objArr, param, [0, 0], 3).toThrow(
            Error
        )
    );

    const param = "value";
    mockObj['value'] = 3;

    expect(
        ()=>Main.RandomizePoolTotalPure(objArr, param, [0, 0], 3).toBeTruthy()
    );
});


import "babel-polyfill"; 

import { Get_TimeLeft } from '../src/client/js/GetTime.js' ;


describe("Testing the submit functionality", () => {
    
    test("Testing the Get_TimeLeft() function", () => {
            expect(Get_TimeLeft).toBeDefined();
         })


});


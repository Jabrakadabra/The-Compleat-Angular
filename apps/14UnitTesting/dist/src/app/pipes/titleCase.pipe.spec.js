"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var titleCase_pipe_1 = require("pipes/titleCase.pipe");
describe('TitleCasePipe', function () {
    var pipe = new titleCase_pipe_1.TitleCasePipe();
    it("transforms 'abc' to 'Abc'", function () {
        expect(pipe.transform('abc')).toBe('Abc');
    });
    it("transforms \"abc def\" to \"Abc Def\"", function () {
        expect(pipe.transform('abc def')).toBe('Abc Def');
    });
    it("leaves acronyms alone", function () {
        expect(pipe.transform('NASA')).toBe('NASA');
        expect(pipe.transform('NOrfolk')).toBe('Norfolk');
        expect(pipe.transform('my life at NASA')).toBe('My Life At NASA');
    });
    // it(`deals with single letter words`, () => {
    // 	expect(pipe.transform('a day in a life')).toBe('A Day in A Life');
    // })
});
//# sourceMappingURL=titleCase.pipe.spec.js.map
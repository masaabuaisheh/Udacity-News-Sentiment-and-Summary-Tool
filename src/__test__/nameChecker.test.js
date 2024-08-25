// nameChecker.test.js
const { checkForName } = require('../client/js/nameChecker');

describe('urlValidation', () => {

    test('check if false url', () => {
        expect(checkForName("read")).toBeFalsy();
    });

    test('emails are not valid url', () => {
        expect(checkForName("mailto:masa@gmail.com")).toBeFalsy();
    });

    test('expect url to be true', () => {
        expect(checkForName("https://www.google.com")).toBeTruthy();
    });

    test('expect empty string', () => {
        expect(checkForName("")).toBeFalsy();
    });
});
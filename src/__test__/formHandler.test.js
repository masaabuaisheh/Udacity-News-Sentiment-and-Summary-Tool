import { formHandler, initializeFormHandler } from '../client/js/formHandler';

beforeEach(() => {
  document.body.innerHTML = `
    <form id="form">
      <input type="text" id="article-url" />
      <button type="submit">Submit</button>
    </form>
    <div id="results"></div>
    <div id="error"></div>
    <div id="agreement"></div>
    <div id="subjectivity"></div>
    <div id="confidence"></div>
    <div id="irony"></div>
    <div id="score_tag"></div>
  `;

  initializeFormHandler(); // Initialize the form handler in the test environment
});

describe('formHandler', () => {
  it('should be defined', () => {
    expect(formHandler).toBeDefined();
  });

});

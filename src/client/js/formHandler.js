// import axios from 'axios';
// import { checkForName } from "./nameChecker";

// const formHandler = async (event) => {
//     event.preventDefault();

//     const inputElement = document.getElementById('article-url');
//     const input = inputElement ? inputElement.value : '';
//     const results = document.querySelectorAll("#results div");
//     const error = document.querySelector("#error");
//     const agreement = document.getElementById('agreement');
//     const subjectivity = document.getElementById('subjectivity');
//     const confidence = document.getElementById('confidence');
//     const irony = document.getElementById('irony');
//     const score_tag = document.getElementById('score_tag');

//     // Clear old results
//     clearResults(results, agreement, subjectivity, confidence, irony, score_tag);

//     if (!checkForName(input)) {
//         show_error("Please, enter a valid URL", results, error);
//         return;
//     }

//     try {
//         const response = await axios.post('http://localhost:8000/', { input }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         console.log("Full Response Object:", response);
//         console.log("Response Data:", response.data);

//         const { msg, sample } = response.data;

//         console.log("Message:", msg);
//         console.log("Sample:", sample);

//         if (msg) {
//             // Determine custom error message based on the response message
//             const customErrorMsg = msg.includes('Operation denied') 
//                 ? "Please enter a valid URL" 
//                 : msg;
//             show_error(customErrorMsg, results, error);
//         } else {
//             show_results(sample, results, agreement, subjectivity, confidence, irony, score_tag, error);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         show_error("An unexpected error occurred. Please try again later.", results, error);
//     }
// };

// const clearResults = (results, agreement, subjectivity, confidence, irony, score_tag) => {
//     // Hide and clear results
//     results.forEach(result => {
//         result.style.display = 'none';
//         result.innerHTML = ''; // Clear old data
//     });

//     // Clear result fields
//     if (agreement) agreement.innerHTML = '';
//     if (subjectivity) subjectivity.innerHTML = '';
//     if (confidence) confidence.innerHTML = '';
//     if (irony) irony.innerHTML = '';
//     if (score_tag) score_tag.innerHTML = '';
// };

// const show_error = (msg, results, error) => {
//     if (error) {
//         error.innerText = msg || "An unknown error occurred.";
//         error.style.display = 'block';
//     }

//     // Hide and clear results
//     clearResults(results, null, null, null, null, null);
// };

// const show_results = (sample, results, agreement, subjectivity, confidence, irony, score_tag, error) => {
//     if (error) {
//         error.style.display = 'none'; // Hide error message if results are being shown
//     }

//     // Show and update results
//     results.forEach(result => {
//         result.style.display = 'block';
//     });

//     if (sample) {
//         agreement.innerHTML = `<strong>Agreement:</strong> ${sample.agreement || 'No data available'}`;
//         subjectivity.innerHTML = `<strong>Subjectivity:</strong> ${sample.subjectivity || 'No data available'}`;
//         confidence.innerHTML = `<strong>Confidence:</strong> ${sample.confidence || 'No data available'}`;
//         irony.innerHTML = `<strong>Irony:</strong> ${sample.irony || 'No data available'}`;
//         score_tag.innerHTML = `<strong>Score Tag:</strong> ${sample.score_tag || 'No data available'}`;
//     } else {
//         // Provide a fallback message if sample is missing
//         agreement.innerHTML = `<strong>Agreement:</strong> No data available`;
//         subjectivity.innerHTML = `<strong>Subjectivity:</strong> No data available`;
//         confidence.innerHTML = `<strong>Confidence:</strong> No data available`;
//         irony.innerHTML = `<strong>Irony:</strong> No data available`;
//         score_tag.innerHTML = `<strong>Score Tag:</strong> No data available`;
//     }
// };

// document.getElementById('form').addEventListener('submit', formHandler);

// export default formHandler;


import axios from 'axios';
import { checkForName } from "./nameChecker";

export const formHandler = async (event) => {
    event.preventDefault();

    const inputElement = document.getElementById('article-url');
    const input = inputElement ? inputElement.value : '';
    const results = document.querySelectorAll("#results div");
    const error = document.querySelector("#error");
    const agreement = document.getElementById('agreement');
    const subjectivity = document.getElementById('subjectivity');
    const confidence = document.getElementById('confidence');
    const irony = document.getElementById('irony');
    const score_tag = document.getElementById('score_tag');

    // Clear old results
    clearResults(results, agreement, subjectivity, confidence, irony, score_tag);

    if (!checkForName(input)) {
        show_error("Please, enter a valid URL", results, error);
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/', { input }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Full Response Object:", response);
        console.log("Response Data:", response.data);

        const { msg, sample } = response.data;

        console.log("Message:", msg);
        console.log("Sample:", sample);

        if (msg) {
            const customErrorMsg = msg.includes('Operation denied') 
                ? "Please enter a valid URL" 
                : msg;
            show_error(customErrorMsg, results, error);
        } else {
            show_results(sample, results, agreement, subjectivity, confidence, irony, score_tag, error);
        }
    } catch (error) {
        console.error("Error:", error);
        show_error("An unexpected error occurred. Please try again later.", results, error);
    }
};

const clearResults = (results, agreement, subjectivity, confidence, irony, score_tag) => {
    results.forEach(result => {
        result.style.display = 'none';
        result.innerHTML = ''; // Clear old data
    });

    if (agreement) agreement.innerHTML = '';
    if (subjectivity) subjectivity.innerHTML = '';
    if (confidence) confidence.innerHTML = '';
    if (irony) irony.innerHTML = '';
    if (score_tag) score_tag.innerHTML = '';
};

const show_error = (msg, results, error) => {
    if (error) {
        error.innerText = msg || "An unknown error occurred.";
        error.style.display = 'block';
    }

    clearResults(results, null, null, null, null, null);
};

const show_results = (sample, results, agreement, subjectivity, confidence, irony, score_tag, error) => {
    if (error) {
        error.style.display = 'none'; // Hide error message if results are being shown
    }

    results.forEach(result => {
        result.style.display = 'block';
    });

    if (sample) {
        agreement.innerHTML = `<strong>Agreement:</strong> ${sample.agreement || 'No data available'}`;
        subjectivity.innerHTML = `<strong>Subjectivity:</strong> ${sample.subjectivity || 'No data available'}`;
        confidence.innerHTML = `<strong>Confidence:</strong> ${sample.confidence || 'No data available'}`;
        irony.innerHTML = `<strong>Irony:</strong> ${sample.irony || 'No data available'}`;
        score_tag.innerHTML = `<strong>Score Tag:</strong> ${sample.score_tag || 'No data available'}`;
    } else {
        agreement.innerHTML = `<strong>Agreement:</strong> No data available`;
        subjectivity.innerHTML = `<strong>Subjectivity:</strong> No data available`;
        confidence.innerHTML = `<strong>Confidence:</strong> No data available`;
        irony.innerHTML = `<strong>Irony:</strong> No data available`;
        score_tag.innerHTML = `<strong>Score Tag:</strong> No data available`;
    }
};

export const initializeFormHandler = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
        formElement.addEventListener('submit', formHandler);
    } else {
        console.error("Form element not found");
    }
};


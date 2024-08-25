const axios = require("axios");
const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1";

const analyze = async (url, key) => {
    try {
        const response = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`);
        const { code, msg } = response.data.status;

        if (code === '100' || code === '212') {
            return handleError(code, msg);
        }

        return handleSuccess(response.data, code);
    } catch (error) {
        console.error("Error in analyze function:", error);
        return handleError('500', "Internal server error");
    }
};

const handleError = (code, msg) => ({
    code,
    msg
});

const handleSuccess = (data, code) => {
    const { agreement, subjectivity, confidence, score_tag, irony } = data;
    const sample = {
        agreement,
        subjectivity,
        confidence, 
        score_tag, 
        irony
    };

    return {
        sample,
        code
    };
};

module.exports = { analyze };

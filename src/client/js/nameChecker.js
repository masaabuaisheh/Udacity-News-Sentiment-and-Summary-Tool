const validUrl = require('valid-url');

const isValidUrl = (url) => Boolean(validUrl.isUri(url));

const checkForName = (url) => {
    // Reject email addresses or other non-URLs
    if (url.startsWith('mailto:')) {
        return false;
    }
    
    // Check if the input is a valid URL
    return isValidUrl(url);
}

export { checkForName };

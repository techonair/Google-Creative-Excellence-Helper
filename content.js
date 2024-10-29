// content.js

// Function to extract the timestamp
function extractTimestamp() {
    const timestampElement = document.querySelector('span.g3[title]');
    const timestamp = timestampElement ? timestampElement.getAttribute('title') : null;
    console.log("Extracted Timestamp:", timestamp); // Log the extracted timestamp
    return timestamp;
}

// Function to extract case details
function extractCaseDetails() {
    const caseDetails = {
        MasterId: null,
        CaseId: null,
        Sector: null,
        FieldC: null,
        FieldD: null,
        FieldE: null,
        FieldF: null,
        FieldG: null,
        FieldH: null,
        FieldI: null
    };

    // Locate the specific div containing the message content using getElementById
    const messageContent = document.getElementById(':9l'); // Change here

    // Check if the message content is found
    if (!messageContent) {
        console.error("Message content not found!"); // Log error if content not found
        return caseDetails;
    }

    // Locate "Case Details:" and get all following elements for key-value pairs
    const elements = Array.from(messageContent.querySelectorAll('div'));
    let startIndex = elements.findIndex(div => div.textContent.includes('Case Details:'));

    console.log("Start Index of 'Case Details':", startIndex); // Log the start index

    if (startIndex !== -1) {
        // Loop through elements following "Case Details:" to extract the key-value pairs
        for (let i = startIndex + 1; i < elements.length; i++) {
            const text = elements[i].textContent.trim();

            // Stop if we reach unrelated sections
            if (text === "Kind Regards") break;

            console.log("Processing Element:", text); // Log the text of each element

            // Check if the text starts with any of the field names
            Object.keys(caseDetails).forEach(field => {
                if (text.startsWith(field)) {
                    const value = text.split(/[:\-]/)[1]?.trim(); // Extract value
                    if (value) {
                        caseDetails[field] = value; // Assign the extracted value to the corresponding key
                        console.log(`Extracted ${field}:`, value); // Log each extracted key-value pair
                    }
                }
            });
        }
    } else {
        console.warn("Case Details section not found."); // Log a warning if section is not found
    }

    return caseDetails;
}

// Combine extracted data
// const data = {
//     timestamp: extractTimestamp(),
//     caseDetails: extractCaseDetails()
// };

// // Log the final data before sending
// console.log("Data to send to API:", data);

function getDataFromPage() {
    return {
        timestamp: extractTimestamp(),
        caseDetails: extractCaseDetails()
    };
}

// Send data to the background script
// chrome.runtime.sendMessage({ action: "sendDataToAPI", payload: data });
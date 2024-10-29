chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "sendDataToAPI") {
      fetch("http://127.0.0.1:5000/insert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request.payload)
      })
      .then(response => response.json())
      .then(data => {
          console.log("Data sent to API successfully:", data);
          sendResponse({ success: true });
      })
      .catch(error => {
          console.error("Error sending data to API:", error);
          sendResponse({ success: false, error: error.message });
      });
      
      return true; // Keep the message channel open for async response
  }
});


// To store data in sheets
// chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
//     if (message.action === "sendToSheet") {
//       const data = message.data;
//       const sheetId = "YOUR_SHEET_ID";
  
//       try {
//         const response = await fetch(
//           `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
//           {
//             method: "POST",
//             headers: {
//               "Authorization": `Bearer ${await getAuthToken()}`,
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ values: data })
//           }
//         );
//         sendResponse({ success: response.ok });
//       } catch (error) {
//         console.error("Error:", error);
//         sendResponse({ success: false });
//       }
//     }
//     return true;
//   });
  
//   // Function to get Google OAuth token
//   async function getAuthToken() {
//     return new Promise((resolve, reject) => {
//       chrome.identity.getAuthToken({ interactive: true }, (token) => {
//         if (chrome.runtime.lastError) {
//           reject(chrome.runtime.lastError);
//         } else {
//           resolve(token);
//         }
//       });
//     });
//   }
  
document.getElementById("sendData").addEventListener("click", async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // First, inject content.js into the active tab
  await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: ['content.js']
  });

  // Now execute getDataFromPage to retrieve data
  chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: () => getDataFromPage() // Call the getDataFromPage function in content.js
  }, (results) => {
      if (results && results[0] && results[0].result) {
          const data = results[0].result;
          document.getElementById("status").innerText = "Sending data...";
          
          // Send the data to background.js to forward to the API
          chrome.runtime.sendMessage({ action: "sendDataToAPI", payload: data }, (response) => {
              document.getElementById("status").innerText = response.success ? "Data sent!" : "Failed to send data.";
          });
      } else {
          document.getElementById("status").innerText = "Failed to retrieve data.";
      }
  });
});

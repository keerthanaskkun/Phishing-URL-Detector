function checkURL() {
  const url = document.getElementById("urlInput").value.trim();
  const result = document.getElementById("result");

  // Check if input is empty
  if (!url) {
    result.innerText = " Please enter a URL first!";
    result.style.color = "orange";
    return;
  }

  // (Optional) Check if the format is valid
  const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(url);
  if (!isValidUrl) {
    result.innerText = " Please enter a valid URL (start with http or https)";
    result.style.color = "orange";
    return;
  }

  result.innerText = "Analyzing...";
  result.style.color = "#777";

  fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url })
  })
    .then(res => res.json())
    .then(data => {
      if (data.prediction === 1) {
        result.innerText = "This is a phishing URL!";
        result.style.color = "red";
      } else {
        result.innerText = "This URL seems safe.";
        result.style.color = "green";
      }
    })
    .catch(() => {
      result.innerText = "Server error. Please try again.";
      result.style.color = "orange";
    });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const icon = document.getElementById("themeIcon");
  icon.innerText = document.body.classList.contains("dark") ? "🔒" : "🔓";
}

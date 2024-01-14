async function generateWorkoutButton() {
  const backend_url = "http://localhost:3000"
  const user_input = {
    gender: document.getElementById('gender').value,
    weight_class: document.getElementById('weight').value,
    age_range: document.getElementById('age').value,
    height: document.getElementById('height').value,
    experience: document.getElementById('experience').value
  };

  const queryString = Object.entries(user_input)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  // Append query string to the URL
  const fullUrl = queryString ? `${backend_url}?${queryString}` : backend_url;

  console.log(user_input);
  fetch(fullUrl)
    .then(response => response.text()).then(data => appendToElement(data));
}

function appendToElement(text) {
  const resultSection = document.querySelector('div.result-section');
  resultSection.innerHTML += `<p>${text}</p>`;
}


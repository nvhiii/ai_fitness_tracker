async function generateWorkoutButton() {
  // Show loading screen
  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "block";

  // Set loading screen to cover the entire background
  loadingElement.style.position = "fixed";
  loadingElement.style.top = "0";
  loadingElement.style.left = "0";
  loadingElement.style.width = "100%";
  loadingElement.style.height = "100%";

  const backend_url = "http://localhost:3000";

  // Your existing code to get user input
  const user_input = {
    gender: document.getElementById('gender').value,
    weight_class: document.getElementById('weight').value,
    age_range: document.getElementById('age').value,
    height: document.getElementById('height').value,
    experience: document.getElementById('experience').value
  };

  
  // Your existing code to create the query string
  const queryString = Object.entries(user_input)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  // Append query string to the URL
  const fullUrl = queryString ? `${backend_url}?${queryString}` : backend_url;

  console.log(user_input);

  // Fetch data from the backend
  fetch(fullUrl)
    .then(response => response.text()) // Assuming the response is text
    .then(data => {
      document.getElementById("loading").style.display = "none";

      // Store the data in local storage
      localStorage.setItem('workoutData', data);
      // Redirect to workout-regimen.html
      window.location.href = "workout-regimen.html";
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      document.getElementById("loading").style.display = "none";
    });

  
}

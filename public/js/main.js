console.log('Campus Exchange loaded');

// A simple Fuzzy Search function to detect typos
function isFuzzyMatch(searchTerm, title) {
  const lowerTitle = title.toLowerCase();
  
  // 1. Exact match or partial match (e.g., "calc" matches "calculator")
  if (lowerTitle.includes(searchTerm)) return true;
  
  // 2. If the search term is very short (1 or 2 letters), don't try to fuzzy match
  if (searchTerm.length < 3) return false;

  // 3. Fuzzy check: Count how many letters from the search term appear in the title
  let matches = 0;
  for (let i = 0; i < searchTerm.length; i++) {
    if (lowerTitle.includes(searchTerm[i])) {
      matches++;
    }
  }
  
  // If 70% or more of the letters match, consider it a match
  return (matches / searchTerm.length) >= 0.7;
}

let listingsData = []; // This will hold the data from the server

// 1. Find the container
const container = document.getElementById("listings-container");

// 2. Create a FUNCTION that builds the cards
function renderListings(dataToRender) {
  let htmlString = "";

  // Loop through whatever data is passed to the function
  for (let item of dataToRender) {
    htmlString += `
      <div class="listing-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p class="price">${item.price}</p>
          <div class="card-tags">
            <span class="tag condition">${item.condition}</span>
            <span class="tag category">${item.category}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Put the HTML into the container
  container.innerHTML = htmlString;
}

// 3. Call the function immediately so the page isn't empty on load
renderListings(listingsData);

// --- STATE VARIABLES ---
// We use these to remember what the user has selected
let currentSearchTerm = "";
let currentCategory = "All";

// --- THE MASTER FILTER FUNCTION ---
function applyFilters() {
  // 1. Filter by BOTH Search and Category
  const filteredListings = listingsData.filter(function(item) {
    // Check 1: Does it match the search text?
    const matchesSearch = currentSearchTerm === "" || isFuzzyMatch(currentSearchTerm, item.title);
    
    // Check 2: Does it match the category button?
    const matchesCategory = currentCategory === "All" || item.category === currentCategory;

    // Only keep the item if BOTH checks are true
    return matchesSearch && matchesCategory;
  });

  // 2. Sort alphabetically
  filteredListings.sort((a, b) => a.title.localeCompare(b.title));

  // 3. Render
  renderListings(filteredListings);
}

// --- EVENT LISTENERS ---

// 1. Find the search bar and listen for typing
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function(event) {
  currentSearchTerm = event.target.value.toLowerCase().trim();
  applyFilters(); // Call the master function
});

// 2. Find the buttons and listen for clicks
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    
    // Remove 'active' class from ALL buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    
    // Add 'active' class to the button we just clicked
    event.target.classList.add("active");

    // Update our state variable (reads the data-category attribute)
    currentCategory = event.target.getAttribute("data-category");

    // Call the master function!
    applyFilters();
  });
});

// 3. Call the function immediately so the page isn't empty on load
// Fetch data from our backend API
async function loadListings() {
  try {
    // 1. Ask the server for the data
    const response = await fetch('/api/listings');
    
    // 2. Convert the response to JavaScript objects
    listingsData = await response.json();
    
    // 3. Now that we have the data, render it!
    applyFilters();
    
  } catch (error) {
    console.error("Error loading listings:", error);
  }
}

// Start the app
loadListings();
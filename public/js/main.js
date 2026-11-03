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

const listingsData = [
  {
    id: 1,
    title: "Calculus Early Transcendentals",
    price: "₹450",
    condition: "Good",
    category: "Book",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80"
  },
  {
    id: 2,
    title: "Casio FX-991EX Calculator",
    price: "₹800",
    condition: "Like New",
    category: "Calculator",
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=400&q=80"
  },
  {
    id: 3,
    title: "Lab Coat & Goggles Set",
    price: "Free",
    condition: "Fair",
    category: "Lab",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80"
  },
  {
    id: 4,
    title: "CSE 1st Year Handwritten Notes",
    price: "₹150",
    condition: "Good",
    category: "Notes",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80"
  },
    {
    id: 5,
    title: "Engineering Drawing Book",
    price: "₹300",
    condition: "Good",
    category: "Lab",
    image: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=400&q=80"
  }
];

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

// 1. Find the search bar
const searchInput = document.getElementById("search-input");

// 2. Listen for the user typing
searchInput.addEventListener("input", function(event) {
  
  // Get what the user typed, make it lowercase, and remove extra spaces
  const searchTerm = event.target.value.toLowerCase().trim();

  // 1. Filter using our new Fuzzy Search function
  const filteredListings = listingsData.filter(function(item) {
    // If the search bar is empty, show everything
    if (searchTerm === "") return true; 
    
    // Otherwise, check if the title is a fuzzy match
    return isFuzzyMatch(searchTerm, item.title);
  });

  // 2. Sort the filtered results alphabetically by title
  filteredListings.sort((a, b) => a.title.localeCompare(b.title));

  // 3. Render them!
  renderListings(filteredListings);
});
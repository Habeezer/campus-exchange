console.log('Campus Exchange loaded');
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

// 1. Find the empty box on the page
const container = document.getElementById("listings-container");

// 2. Create an empty text string to hold our HTML
let htmlString = "";

// 3. Look at each item in our data, one by one
for (let item of listingsData) {
  
  // 4. Write the HTML for this item and add it to our text string
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

// 5. Put the final string into the empty box
container.innerHTML = htmlString;
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// This allows Express to understand JSON data (we will need this tomorrow!)
app.use(express.json());

// 1. MOVE THE DATA HERE
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

// 2. CREATE THE API ROUTE
app.get('/api/listings', (req, res) => {
  // When someone visits this URL, send them the data as JSON
  res.json(listingsData);
});

// Serve the frontend files (keep this at the bottom)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Campus Exchange running at http://localhost:${PORT}`);
});
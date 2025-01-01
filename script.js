// script.js

const API_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";

document.addEventListener("DOMContentLoaded", () => {
    const bookListSection = document.getElementById("book-list");
    const bookDetailsSection = document.getElementById("book-details");
    const bookRow = document.querySelector(".book-row");
    const backButton = document.getElementById("back-to-list");
    const searchBar = document.getElementById("search-bar");

    const detailsTitle = document.getElementById("details-title");
    const detailsAuthor = document.getElementById("details-author");
    const detailsYear = document.getElementById("details-year");
    const detailsPages = document.getElementById("details-pages");
    const detailsAudience = document.getElementById("details-audience");
    const detailsOtherInfo = document.getElementById("details-other-info");
    const detailsCoverImage = document.getElementById("details-cover-image");

    const bookCovers = {
        1: "Bilder/cover1.jpg",
        2: "Bilder/cover2.jpg",
        3: "Bilder/cover3.jpg",
        4: "Bilder/cover4.jpg",
        5: "Bilder/cover5.jpg",
        6: "Bilder/cover6.jpg",
        7: "Bilder/cover7.jpg",
        8: "Bilder/cover8.jpg"
    };

    let allBooks = [];

    // Hämta och visa böcker
    fetch(API_URL)
        .then(response => response.json())
        .then(books => {
            allBooks = books; // Spara alla böcker för sökning
            displayBooks(books);
        })
        .catch(error => console.error("Error fetching books:", error));

    // Funktion för att visa böcker
    function displayBooks(books) {
        bookRow.innerHTML = ""; // Rensa boklistan
        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.className = "book-card";

            const coverImage = bookCovers[book.id] || "Bilder/default-cover.jpg";

            bookCard.innerHTML = `
                <img src="${coverImage}" alt="${book.title} omslag">
                <h3>${book.title}</h3>
                <p>Författare: ${book.author}</p>
            `;
            bookCard.addEventListener("click", () => showBookDetails(book, coverImage));
            bookRow.appendChild(bookCard);
        });
    }

    // Visa detaljer för en bok
    function showBookDetails(book, coverImage) {
        detailsTitle.textContent = book.title;
        detailsAuthor.textContent = book.author;
        detailsYear.textContent = book.year || "Ingen information tillgänglig";
        detailsPages.textContent = book.pages || "Ingen information tillgänglig";
        detailsAudience.textContent = book.audience || "Ingen information tillgänglig";

        // Hämta "Övrig information" från boken
        detailsOtherInfo.textContent = book.otherInfo || "Ingen övrig information tillgänglig.";
        detailsCoverImage.src = coverImage;

        bookListSection.classList.add("hidden");
        bookDetailsSection.classList.remove("hidden");
        searchBar.classList.add("hidden"); // Dölj sökfältet
    }

    // Tillbaka till boklistan
    backButton.addEventListener("click", () => {
        bookListSection.classList.remove("hidden");
        bookDetailsSection.classList.add("hidden");
        searchBar.classList.remove("hidden"); // Visa sökfältet igen
    });

    // Söka böcker
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        const filteredBooks = allBooks.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks);
    });
});

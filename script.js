// script.js

const API_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";

document.addEventListener("DOMContentLoaded", () => {
    const bookListSection = document.getElementById("book-list");
    const bookDetailsSection = document.getElementById("book-details");
    const bookRow = document.querySelector(".book-row");
    const backButton = document.getElementById("back-to-list");
    const footer = document.querySelector("footer");

    const detailsTitle = document.getElementById("details-title");
    const detailsAuthor = document.getElementById("details-author");
    const detailsYear = document.getElementById("details-year");
    const detailsPages = document.getElementById("details-pages");
    const detailsAudience = document.getElementById("details-audience");
    const detailsDescription = document.getElementById("details-description");
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

    // Hämta och visa böcker
    fetch(API_URL)
        .then(response => response.json())
        .then(books => {
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
        })
        .catch(error => console.error("Error fetching books:", error));

    // Visa detaljer för en bok
    function showBookDetails(book, coverImage) {
        detailsTitle.textContent = book.title;
        detailsAuthor.textContent = book.author;
        detailsYear.textContent = book.year || "Ingen information tillgänglig";
        detailsPages.textContent = book.pages || "Ingen information tillgänglig";
        detailsAudience.textContent = book.audience || "Ingen information tillgänglig";
        detailsDescription.textContent = book.description || "Ingen beskrivning tillgänglig.";
        detailsCoverImage.src = coverImage;

        bookListSection.classList.add("hidden");
        bookDetailsSection.classList.remove("hidden");
    }

    // Tillbaka till boklistan
    backButton.addEventListener("click", () => {
        bookListSection.classList.remove("hidden");
        bookDetailsSection.classList.add("hidden");
    });
});

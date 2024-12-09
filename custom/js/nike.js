const settings = {
    itemsPerPage: 4, // Nombre d'articles affichés par page
    shoes: [ // Liste des chaussures avec leurs propriétés (nom, prix, image)
        { name: "Air Jordan 1", price: 26780, image: "jordan-1.webp" },
        { name: "Air Jordan 2", price: 7680, image: "jordan-2.webp" },
        { name: "Air Jordan 3", price: 26543, image: "jordan-3.webp" },
        { name: "Air Jordan 4", price: 14900, image: "jordan-4.webp" },
        { name: "Air Jordan 5", price: 4780, image: "jordan-5.webp" },
        { name: "Air Jordan 6", price: 18980, image: "jordan-6.webp" },
        { name: "Air Jordan 7", price: 26780, image: "jordan-6.webp" },
        { name: "Air Jordan 8", price: 7680, image: "jordan-5.webp" },
        { name: "Air Jordan 9", price: 26543, image: "jordan-4.webp" },
        { name: "Air Jordan 10", price: 14900, image: "jordan-3.webp" },
        { name: "Air Jordan 11", price: 4780, image: "jordan-2.webp" },
        { name: "Air Jordan 12", price: 18980, image: "jordan-1.webp" },
        { name: "Air Jordan 13", price: 26780, image: "jordan-1.webp" },
        { name: "Air Jordan 14", price: 7680, image: "jordan-2.webp" },
        { name: "Air Jordan 15", price: 26543, image: "jordan-3.webp" },
        { name: "Air Jordan 16", price: 14900, image: "jordan-4.webp" },
        { name: "Air Jordan 17", price: 4780, image: "jordan-5.webp" },
        { name: "Air Jordan 18", price: 18980, image: "jordan-6.webp" },
        { name: "Air Jordan 19", price: 26780, image: "jordan-6.webp" },
        { name: "Air Jordan 20", price: 7680, image: "jordan-5.webp" },
        { name: "Air Jordan 21", price: 26543, image: "jordan-4.webp" },
        { name: "Air Jordan 22", price: 14900, image: "jordan-3.webp" },
        { name: "Air Jordan 23", price: 4780, image: "jordan-2.webp" },
        { name: "Air Jordan 24", price: 18980, image: "jordan-1.webp" },
    ]
};

let pagination = document.getElementById("pagination"); // Conteneur pour les boutons de pagination
let itemsPerPage = settings.itemsPerPage; // Nombre d'articles par page
let shoes = settings.shoes; // Récupération de la liste des chaussures
let totalPagination = Math.ceil(shoes.length / itemsPerPage); // Calcul du nombre total de pages (arrondi au supérieur)
let shoesList = document.getElementById("shoesList"); // Conteneur pour afficher les chaussures

let ul = document.createElement("ul"); // Création de la liste non ordonnée pour la pagination
ul.classList.add("pagination", "pagination-lg"); // Ajout des classes Bootstrap pour styliser la pagination

// Fonction pour afficher les chaussures pour une page donnée
function displayShoes(page) {
    shoesList.innerHTML = ""; // Vide le contenu précédent de la liste
    let startIndex = (page - 1) * itemsPerPage; // Calcul de l'index de départ pour cette page
    let endIndex = startIndex + itemsPerPage; // Calcul de l'index de fin pour cette page

    let shoesToDisplay = shoes.slice(startIndex, endIndex); // Sélection des chaussures à afficher pour cette page
    shoesToDisplay.forEach((shoe) => {
        // Création de l'élément HTML pour une chaussure
        let div = document.createElement("div");
        div.classList.add(
            "col-lg-4",
            "col-md-6",
            "col-12",
            "d-flex",
            "align-items-center",
            "justify-content-center",
            "position-relative",
            "shoe",
            "showShoe"
        );
        // Ajout du contenu HTML de la chaussure
        div.innerHTML = `
        <img src="./images/${shoe.image}" width="100%" class="gray-scale">
        <div class="position-absolute price d-flex align-items-center justify-content-center fw-bolder h5">
            ${shoe.price} €</div>
        <div class="position-absolute model p-3 fw-bolder h3">${shoe.name}</div>`;

        shoesList.appendChild(div); // Ajout de l'élément chaussure au conteneur
    });
}

// Boucle pour générer les boutons de pagination
for (let i = 1; i <= totalPagination; i++) {
    let li = document.createElement("li"); // Création d'un élément de liste pour chaque page
    li.classList.add("page-item"); // Ajout de la classe Bootstrap pour la pagination

    let a = document.createElement("a"); // Création d'un lien pour chaque page
    a.textContent = `${i}`; // Texte du lien (numéro de la page)
    a.classList.add(
        "page-link",
        "font-weight-bold",
        "text-dark",
        "unselectedPaginator"
    );
    a.dataset.page = i; // Ajout d'un attribut personnalisé pour identifier le numéro de page
    li.appendChild(a); // Ajout du lien dans l'élément de liste

    ul.appendChild(li); // Ajout de l'élément de liste dans la liste non ordonnée
    pagination.appendChild(ul); // Ajout de la liste non ordonnée dans le conteneur de pagination

    // Ajout d'un gestionnaire d'événement au clic pour chaque lien
    a.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien

        // Mise à jour des classes pour la pagination (désélectionner tous les liens)
        document.querySelectorAll(".page-link").forEach((link) => {
            link.classList.remove("selectedPaginator"); // Retirer la classe sélectionnée
            link.classList.add("unselectedPaginator"); // Ajouter la classe non sélectionnée
        });
        // Marquer le lien cliqué comme sélectionné
        a.classList.remove("unselectedPaginator");
        a.classList.add("selectedPaginator");

        // Afficher les chaussures correspondant à la page sélectionnée
        let selectedPage = parseInt(a.dataset.page, 10); // Récupération du numéro de page depuis l'attribut
        displayShoes(selectedPage); // Appel de la fonction pour afficher les chaussures
    });
}

// Affichage initial des chaussures pour la première page
displayShoes(1); // Affiche les chaussures de la première page
document.querySelector(".page-link").classList.add("selectedPaginator"); // Marque le premier lien comme sélectionné
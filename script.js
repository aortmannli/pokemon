// Function to get the image URL of a Pokemon
function getPokemonImage(pokemon) {
    return pokemon.sprites.other['official-artwork'].front_default;
}

// Function to fetch the list of Pokemon from the API
async function fetchPokemon() {
    // Set fetch limit to a 100 Pokemon
    const limit = 100;

    // Await response from PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    allPokemon = data.results;

    // Call function to display the Pokemon cards on the main page
    displayPokemon();
}

// Function to display the list of Pokemon on the page
function displayPokemon() {
    // Get the Pokemon Container div
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = ''; // Clear the container before adding new content

    // Pages
    const start = (currentPage - 1) * pokemonPerPage;
    const end = start + pokemonPerPage;

    // Get the pokemon to display based on what page the user is viewing
    const pokemonToDisplay = allPokemon.slice(start, end);

    // Fetch and display each Pokemon's details
    pokemonToDisplay.forEach(async (pokemon) => {
        // Make call to PokeAPI to get pokemon-specific data.
        const pokemonResponse = await fetch(pokemon.url);
        // Get json data from the response
        const pokemonData = await pokemonResponse.json();

        // Create new div to display Pokemon card
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${getPokemonImage(pokemonData)}" alt="${pokemon.name}">
        `;
        pokemonContainer.appendChild(pokemonCard);
    });

    updatePagination(); // Update pagination controls
}

// Function to fetch and display a specific Pokemon by name
function getPokemon(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            // Error if the response status is not OK
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }

            // Get the json for the response
            return response.json();
        })
        .then(data => { 
            // process the data in the json response
            // call the getPokemonImage function to get and display the image from payload
            const pokemonContainer = document.getElementById('pokemon-container');
            pokemonContainer.innerHTML = `
                <div class="pokemon-card">
                    <h2>${data.name}</h2>
                    <img src="${getPokemonImage(data)}" alt="${data.name}">
                </div>
            `;
        })
        .catch(error => {
            alert(error.message); // Alert the user if the Pokemon is not found
        });
}

// Function to fetch and display a list of berries
function fetchBerries() {
    // Make a call to PokeAPI to get a list of berries
    fetch('https://pokeapi.co/api/v2/berry')
        .then(response => response.json())
        .then(data => {
            const berryList = document.getElementById('berry-list');

            // Iterate through the list of berries
            data.results.forEach(berry => {
                // For each berry name, capitalize it and use it to construct the link to Bublapedia
                // The link will take you to the wiki page for the specific berry
                const berryName = berry.name.charAt(0).toUpperCase() + berry.name.slice(1);
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = `https://bulbapedia.bulbagarden.net/wiki/${berryName}_Berry`;
                link.textContent = berryName;
                listItem.appendChild(link);
                berryList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching berries:', error)); // Log any errors to the console
}
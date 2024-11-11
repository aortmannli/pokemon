async function fetchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();
    const pokemonContainer = document.getElementById('pokemon-container');

    for (const pokemon of data.results) {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        `;
        pokemonContainer.appendChild(pokemonCard);
    }
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import PokemonModal from "./components/PokemonModal";
import styles from "./App.module.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        setPokemonList(response.data.results);
        setFilteredPokemon(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchPokemonData();
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonList]);

  return (
    <>
      <div className={styles.appContainer}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <svg
                viewBox="255.134 222.3387 46.5622 46.5622"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="matrix(0.39459502696990967, 0, 0, 0.39459502696990967, 234.41777038574222, 201.6224365234375)">
                  <path
                    style={{ opacity: 1 }}
                    fill="#cc3f7e"
                    d="M 111.5,52.5 C 113.934,66.4199 116.601,80.4199 119.5,94.5C 130.246,86.7104 141.079,79.0438 152,71.5C 152.667,72.1667 152.667,72.8333 152,73.5C 144.307,83.6934 136.807,94.0267 129.5,104.5C 143.069,107.428 156.735,109.928 170.5,112C 156.735,114.072 143.069,116.572 129.5,119.5C 136.833,129.833 144.167,140.167 151.5,150.5C 150.998,151.521 150.332,151.688 149.5,151C 139.639,143.639 129.639,136.473 119.5,129.5C 116.572,143.069 114.072,156.735 112,170.5C 109.928,156.735 107.428,143.069 104.5,129.5C 94.3606,136.473 84.3606,143.639 74.5,151C 73.6683,151.688 73.0016,151.521 72.5,150.5C 79.8333,140.167 87.1667,129.833 94.5,119.5C 80.6135,116.463 66.6135,113.963 52.5,112C 66.6135,110.037 80.6135,107.537 94.5,104.5C 86.3545,93.1484 78.5211,81.8151 71,70.5C 82.0785,78.6226 93.2452,86.6226 104.5,94.5C 107.697,80.6527 110.03,66.6527 111.5,52.5 Z"
                  ></path>
                </g>
              </svg>
            </div>
            <strong className={styles.logoText}>Radiantly</strong>
          </div>
          <h1 className={styles.appTitle}>Pokemon Search</h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className={styles.pokemonGrid}>
          {filteredPokemon.map((pokemon, index) => (
            <PokemonCard
              key={index}
              name={pokemon.name}
              url={pokemon.url}
              onClick={() => setSelectedPokemon(pokemon)}
            />
          ))}
        </div>
        <AnimatePresence>
          {selectedPokemon && (
            <PokemonModal
              pokemon={selectedPokemon}
              setSelectedPokemon={setSelectedPokemon}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;

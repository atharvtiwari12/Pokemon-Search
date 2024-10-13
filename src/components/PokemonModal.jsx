import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "./PokemonModal.module.css";

function PokemonModal({ pokemon, setSelectedPokemon }) {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };
    fetchPokemonDetails();
  }, [pokemon.url]);

  if (!pokemonDetails) return null;

  const heightInMeters = pokemonDetails.height / 10;

  const weightInKg = pokemonDetails.weight / 10;

  return (
    <motion.div
      className={styles.modalOverlay}
      onClick={() => setSelectedPokemon(null)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img
          className={styles.modalImage}
          src={pokemonDetails.sprites.other["official-artwork"].front_default}
          alt={pokemonDetails.name}
        />
        <h2 className={styles.modalName}>{pokemonDetails.name}</h2>
        <p>Height: {heightInMeters} meters</p>
        <p>Weight: {weightInKg} kilograms</p>
        <p>Base Experience: {pokemonDetails.base_experience} EXP</p>
        <button
          className={styles.modalButton}
          onClick={() => setSelectedPokemon(null)}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export default PokemonModal;

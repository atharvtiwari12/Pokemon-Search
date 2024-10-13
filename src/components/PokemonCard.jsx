import React from "react";
import { motion } from "framer-motion";
import styles from "./PokemonCard.module.css";

function PokemonCard({ name, url, onClick }) {
  return (
    <motion.div
      className={styles.pokemonCard}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 200 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <img
        className={styles.pokemonImage}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          url.split("/")[6]
        }.png`}
        alt={name}
      />
      <h3 className={styles.pokemonName}>{name}</h3>
    </motion.div>
  );
}

export default PokemonCard;

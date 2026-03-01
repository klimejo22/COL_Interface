import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";

export function Homepage() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    // přesměruje na /player?name=<search>
    if (search.trim() !== "") {
      navigate(`/player?name=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>COL Finder</h1>
      <h2>Najdi si jakéhokoliv hráče COL spring split 2026</h2>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Hledat..."
          value={search}
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      <p>Hledáš: {search}</p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: 20,
  },
  searchContainer: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: 250,
  },
  button: {
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer",
  },
};
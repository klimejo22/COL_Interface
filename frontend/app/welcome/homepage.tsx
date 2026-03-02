import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router";

type Player = {
  id: number;
  name: string;
  role: string;
  rating: number;
};
const defaultUrl = "https://www.junglediff.cz/COLFinder-api/"
export function Homepage() {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Player[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (name?: string) => {
    const value = name ?? search;

    if (value.trim() !== "") {
      navigate(`/player?name=${encodeURIComponent(value.trim())}`);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          defaultUrl + "search.php?name=" + encodeURIComponent(search),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>COL Finder</h1>
      <h2>Najdi si jakéhokoliv hráče COL Spring Split 2026</h2>

      <div style={styles.searchContainer}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Hledat..."
            value={search}
            onChange={handleChange}
            style={styles.input}
            onFocus={() => setShowSuggestions(true)}
          />

          {showSuggestions && suggestions.length > 0 && (
            <div style={styles.dropdown}>
              {suggestions.map((player) => (
                <div
                  key={player.id}
                  style={styles.suggestion}
                  onClick={() => {
                    setSearch(player.name);
                    setShowSuggestions(false);
                    handleSearch(player.name);
                  }}
                >
                  {player.name} ({player.role}) – {player.rating}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => handleSearch()} style={styles.button}>
          Search
        </button>
      </div>
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
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    maxHeight: 200,
    overflowY: "auto",
    zIndex: 1000,
  },
  suggestion: {
    padding: 10,
    cursor: "pointer",
    borderBottom: "1px solid #333",
  },
};
import { useLocation } from "react-router";

export function Player() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get("name");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Player Page</h1>
      {name ? (
        <p>Hráč: <strong>{name}</strong></p>
      ) : (
        <p>Nebylo zadáno žádné jméno hráče</p>
      )}
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
};
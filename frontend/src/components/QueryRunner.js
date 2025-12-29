import { useState } from "react";
import { executeQuery } from "../services/api";

export default function QueryRunner() {
  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const runQuery = async () => {
    if (!sql.trim()) {
      setError("Please write SQL query first");
      return;
    }

    try {
      const data = await executeQuery(sql);
      setResult(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div>
      <textarea
        rows="6"
        cols="60"
        placeholder="Write SQL here"
        value={sql}
        onChange={(e) => setSql(e.target.value)}
      />

      <br />

      <button onClick={runQuery}>Execute</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}


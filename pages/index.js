import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [inputs, setInputs] = useState({
    industryInput: "",
    companyInput: "",
  });
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generateReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ industry: inputs.industryInput, companyName: inputs.companyInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log("data", data);
      setResult(data.data);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Review Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>OpenAI Review Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="companyName"
            placeholder="Enter company name"
            value={inputs.companyInput}
            onChange={(e) => setInputs({ ...inputs, companyInput: e.target.value })}
          />
          <input
            type="text"
            name="industry"
            placeholder="Enter your company's industry"
            value={inputs.industryInput}
            onChange={(e) => setInputs({ ...inputs, industryInput: e.target.value })}
          />
          <input type="submit" value="Generate review" />
        </form>
        <div className={styles.result}>
          {result}
          {result && (
            <div className={styles.buttonContainer}>
              <button className={styles.btnPrimary}>Add review</button>
              <button className={styles.btnSecondary}>Generate new</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

import Head from "next/head";
import { useState } from "react";
import styles from "../styles/index.module.css";
import { FormReviewGenerator } from "./components/FormReviewGenerator";
import { Result } from "./components/Result";
import { ErrorInfo } from "./components/ErrorInfo";
import { SkeletonResult } from "./components/SkeletonResult";

export default function Home() {
  const [inputs, setInputs] = useState({
    industryInput: "",
    companyInput: "",
  });

  const [result, setResult] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    result && setResult(null);
    setIsLoading(true);
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
        setIsError(true);
        setIsLoading(false);
        setErrorMsg("Error: Server error request failed. Please contact: contact@justreview.co");
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setIsError(false);
      setErrorMsg("");
      setResult(data.data);
      setIsLoading(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      setIsLoading(false);
      setIsError(true);
      setErrorMsg(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Review Generator</title>
        <link rel="icon" href="/img/favicon-star-gold.png" />
      </Head>

      <main className={styles.main}>
        <img src="/img/justreview.svg" className={styles.icon} />
        <h1 className={styles.heading}>OpenAI Review Generator</h1>
        <FormReviewGenerator inputs={inputs} setInputs={setInputs} onSubmit={onSubmit} />
        {isLoading && !result ? (
          <SkeletonResult></SkeletonResult>
        ) : (
          <Result result={result} styles={styles} />
        )}
      </main>
      <ErrorInfo msg={errorMsg} />
    </div>
  );
}

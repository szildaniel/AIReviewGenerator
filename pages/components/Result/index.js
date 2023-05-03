import React, { Suspense } from "react";
import { SkeletonResult } from "../SkeletonResult";

export const Result = ({ result, styles }) => {
  return (
    <div className={result && styles.result}>
      {result}
      {result && (
        <Suspense fallback={SkeletonResult}>
          <div className={styles.buttonContainer}>
            <button className={styles.btnPrimary}>Add review</button>
            <button className={styles.btnSecondary}>Generate new</button>
          </div>
        </Suspense>
      )}
    </div>
  );
};

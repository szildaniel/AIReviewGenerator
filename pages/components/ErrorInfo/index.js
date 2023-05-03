import styles from "./index.module.css";

import React from "react";

export const ErrorInfo = ({ msg }) => {
  return <div className={msg && styles.error}>{msg}</div>;
};

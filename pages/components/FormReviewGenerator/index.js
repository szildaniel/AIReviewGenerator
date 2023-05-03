import React from "react";

export const FormReviewGenerator = ({ inputs, onSubmit, setInputs }) => {
  return (
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
  );
};

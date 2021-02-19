import React from 'react';
import {
  FormWrapper,
  CalculationForm,
  CalculatorFormInput,
  FormTitle,
  Info, InfoPara,
  ResultSide,
  FormInput
} from "../styles/contants"

export default function InterestForm() {
  return (
	  <FormWrapper>
		<Info>
		  <FormTitle>Interest Savings Calculation</FormTitle>
		  <InfoPara>Grabs four values from the form, and returns general information about a loan.</InfoPara>
		</Info>

		<CalculationForm>
		  <CalculatorFormInput>
			<FormInput className="accrue-field-amount">
			  <p><label>Loan Amount:</label>
				<input type="text" className="amount" value="7,500"/>
			  </p>
			</FormInput>

			<FormInput className="accrue-field-rate">
			  <p>
				<label>Rate (APR):</label>
				<input type="text" className="rate" value="7%"/>
			  </p>
			</FormInput>

			<FormInput className="accrue-field-term">
			  <p>
				<label>Term:</label>
				<input type="text" className="term" value="36m"/>
				<small>Format: 12m, 36m, 3y, 7y</small>
			  </p>
			</FormInput>

			<FormInput className="accrue-field-rate_compare">
			  <p>
				<label>Comparison Rate:</label>
				<input type="text" className="rate_compare" value="1.49%"/>
			  </p>
			</FormInput>
		  </CalculatorFormInput>

		  <ResultSide>
			<p><label>Results:</label></p>
			<div className="results"/>
		  </ResultSide>
		  <div className="clear"/>
		</CalculationForm>
	  </FormWrapper>
  )
}

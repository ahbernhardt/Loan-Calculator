import React from 'react';
import {Result, ResultTable} from "./style";
import {FormWrapper, CalculationForm, CalculatorFormInput, FormTitle, Info, InfoPara,  ResultSide, FormInput} from "../styles/contants"

export default function AmortizationForm() {
  return (
	  <FormWrapper>
		<Info>
		  <FormTitle>Interest Savings Calculation</FormTitle>
		  <InfoPara>Grabs three values from the form, and displays a complete amortization schedule for the provided loan information.</InfoPara>
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
			<ResultTable>
			  <Result className="accrue-amortization">
				<thead>
			  	<tr>
				  <th className="accrue-payment-number">#</th>
				  <th className="accrue-payment-amount">Payment Amt.</th>
				   <th className="accrue-total-interest">Total Interest</th>
				  <th className="accrue-total-payments">Total Payments</th>
				  <th className="accrue-balance">Balance</th>
			  	</tr>
				</thead>
				<tbody>
				  <tr>
					<td className="accrue-payment-number">1</td>
					<td className="accrue-payment-amount">$231.58</td>
					<td className="accrue-total-interest">$23.24</td>
					<td className="accrue-total-payments">$231.58</td>
					<td className="accrue-balance">$7,291.67</td>
				  </tr>
				</tbody>
			  </Result>
			</ResultTable>
		  </ResultSide>
		  <div className="clear"/>
		</CalculationForm>
	  </FormWrapper>
  )
}

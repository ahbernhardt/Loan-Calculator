import React, {useState} from 'react';
import {
  FormWrapper,
  CalculationForm,
  CalculatorFormInput,
  FormTitle,
  Info, InfoPara,
  ResultSide,
  FormInput, InputWrapper, InputBox, ResultLabel
} from "../styles/contants"

export default function InterestForm() {
  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
	amount: '',
	interest: '',
	months: '',
	rate_compare: ''
  })
  // state to storage the results of the calculation
  const [results, setResults] = useState({
	totalCurrentInterest: '',
	totalCompareInterest: '',
	totalSaveInterest: '',
  });

  // state to storage error message
  const [error, setError] = useState('');

  // event handler to update state when the user enters values
  function handleInputChange(event) {
	const value = event.target.value;
	setUserValues({
	  ...userValues,
	  [event.target.name]: value
	});
	event.preventDefault();
	if (isValid()) {
	  setError('');
	  calculateResults(userValues);
	}
  }

  // Manage validations and error messages
  const isValid = () => {
	const {amount, interest, months} = userValues;
	let actualError = '';

	// if (!amount || !interest || !months) {
	//     actualError = 'All the values are required';
	// }

	if (isNaN(amount) || isNaN(interest) || isNaN(months)) {
	  actualError = 'All the values must be a valid number';
	}

	if (Number(amount) < 0 || Number(interest) < 0 || Number(months) < 0) {
	  actualError = 'All the values must be a positive number';
	}
	if (actualError) {
	  setError(actualError);
	  return false;
	}
	return true;
  };


  // Calculation
  const calculateResults = ({amount, interest, months, rate_compare}) => {

	if (Number(interest) > 0) {
	  //Current rate
	  const PrincipalAmount = Number(amount);
	  const monthlyAPR = Number(interest) / 1200;
	  const numberMonths = Number(months);
	  const x = Math.pow(1 + monthlyAPR, -(numberMonths));
	  const monthly = (PrincipalAmount * monthlyAPR) / (1 - x);
	  // const monthlyPaymentCalculated = monthly.toFixed(2);
	  const totalPaymentCalculated = (monthly * numberMonths).toFixed(2);

	  //Compare rate
	  const compareAPR = Number(rate_compare) / 1200;
	  const rc = Math.pow(1 + compareAPR, -(numberMonths));
	  const rc_monthly = (PrincipalAmount * compareAPR) / (1 - rc);
	  // const rc_monthlyPayment = rc_monthly.toFixed(2);
	  const rc_totalPayment = (rc_monthly * numberMonths).toFixed(2);

	  if ((isFinite(monthly)) && (isFinite(rc_monthly))) {
		const totalInterestCalculated = (totalPaymentCalculated - PrincipalAmount).toFixed(2);
		const totalCompareInterestCalculated = (rc_totalPayment - PrincipalAmount).toFixed(2);
		const totalSaveInterestCalculated = (totalInterestCalculated - totalCompareInterestCalculated).toFixed(2);

		// Set up results to the state to be displayed to the user
		setResults({
		  totalCurrentInterest: totalInterestCalculated,
		  totalCompareInterest: totalCompareInterestCalculated,
		  totalSaveInterest: totalSaveInterestCalculated,
		  isResult: true,
		});
	  }
	} else if ((Number(interest) === 0.0) && (Number(rate_compare) === 0.0) && ((Number(amount) % Number(months)) === 0)) {
	  const PrincipalAmount = Number(amount);
	  const numberMonths = Number(months);
	  const monthly = PrincipalAmount / numberMonths;
	  const totalInterestCalculated = (monthly * numberMonths - PrincipalAmount).toFixed(2);
	  if (isFinite(monthly)) {
		// Set up results to the state to be displayed to the user
		setResults({
		  totalCurrentInterest: totalInterestCalculated,
		  totalCompareInterest: totalInterestCalculated,
		  totalSaveInterest: '',
		  isResult: true,
		});
	  }
	}
	// return;
  };

  return (
	  <FormWrapper>
		<Info>
		  <FormTitle>Interest Savings Calculation</FormTitle>
		  <InfoPara>Grabs four values from the form, and returns general information about a loan.</InfoPara>
		</Info>

		<CalculationForm>
		  <CalculatorFormInput>
			<InputWrapper>
			  <FormInput>
				<label>Loan Amount</label>
				<InputBox
					type='text'
					name='amount'
					placeholder='7,500'
					value={userValues.amount}
					onChange={handleInputChange}
				/>
			  </FormInput>
			  <FormInput>
				<label>Interest Rate</label>
				<InputBox
					type='number'
					name='interest'
					step="0.01" min="0"
					placeholder='7.0'
					value={userValues.interest}
					onChange={handleInputChange}
				/>
			  </FormInput>
			  <FormInput>
				<label>Term<small> (# of month)</small></label>
				<InputBox
					type='number'
					name='months'
					placeholder='12'
					min="1"
					value={userValues.months}
					onChange={handleInputChange}
				/>
			  </FormInput>
			  <FormInput>
				<label>Comparison Rate</label>
				<InputBox
					type='number'
					name='rate_compare'
					placeholder='1.49'
					min="1"
					value={userValues.rate_compare}
					onChange={handleInputChange}
				/>
			  </FormInput>
			</InputWrapper>
			<p className='error'>{error}</p>
		  </CalculatorFormInput>

		  <ResultSide>
			<ResultLabel>Results:</ResultLabel>
			<InputWrapper>
			  <FormInput>
				<label>Current Interest Total</label>
				<InputBox
					type='text'
					value={results.totalCurrentInterest}
					disabled
				/>
			  </FormInput>
			  <FormInput>
				<label>Rate Compare Total</label>
				<InputBox
					type='text'
					value={results.totalCompareInterest}
					disabled
				/>
			  </FormInput>
			  <FormInput>
				<label>Interest Save Total</label>
				<InputBox
					type='text'
					value={results.totalSaveInterest}
					disabled
				/>
			  </FormInput>
			</InputWrapper>
		  </ResultSide>
		</CalculationForm>
	  </FormWrapper>
  )
}

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
	years: '',
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
  const handleInputChange = (event) =>{
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
	const {amount, interest, years, rate_compare} = userValues;
	let actualError = '';

	// if (!amount || !interest || !months) {
	//     actualError = 'All the values are required';
	// }

	if (isNaN(amount) || isNaN(interest) || isNaN(years) || isNaN(rate_compare)) {
	  actualError = 'All the values must be a valid number';
	}

	if (Number(amount) < 0 || Number(interest) < 0 || Number(years) < 0 || Number(rate_compare) < 0) {
	  actualError = 'All the values must be a positive number';
	}

	if  (Number(interest) === 0) {
	  actualError = 'There is no interest payment in this Loan';
	}
	if (actualError) {
	  setError(actualError);
	  return false;
	}
	return true;
  };

  const CurrencyFormatter = new Intl.NumberFormat('us-US', {
	style: 'currency',
	currency: 'USD',
  });

  // Calculation
  const calculateResults = ({amount, interest, years, rate_compare}) => {

	if ((Number(interest) > 0.0) && (Number(rate_compare) > 0)) {
	  //Current rate
	  const PrincipalAmount = Number(amount);
	  const monthlyAPR = Number(interest) / 1200;
	  const numberMonths = Number(years) * 12;
	  const ratePower = Math.pow((1 + monthlyAPR), numberMonths);

	  const monthly = PrincipalAmount * ((monthlyAPR * ratePower) / (ratePower - 1));
	  const totalPaymentCalculated = (monthly * numberMonths);

	  //Compare rate
	  const compareAPR = Number(rate_compare) / 1200;
	  const rc = Math.pow((1 + compareAPR), numberMonths);
	  const rc_monthly = PrincipalAmount * ((compareAPR * rc) / (rc - 1));
	  const rc_totalPayment = (rc_monthly * numberMonths);

	  if ((isFinite(monthly)) && (isFinite(rc_monthly))) {
		const totalInterestCalculated = (totalPaymentCalculated - PrincipalAmount);
		const totalCompareInterestCalculated = (rc_totalPayment - PrincipalAmount);
		const totalSaveInterestCalculated = (totalInterestCalculated - totalCompareInterestCalculated);

		// Set up results to the state to be displayed to the user
		setResults({
		  totalCurrentInterest: CurrencyFormatter.format(totalInterestCalculated),
		  totalCompareInterest: CurrencyFormatter.format(totalCompareInterestCalculated),
		  totalSaveInterest: CurrencyFormatter.format(totalSaveInterestCalculated),
		});
	  }
	} else if ((Number(interest) > 0.0) && (Number(rate_compare) === 0)){
	  //Current rate
	  const Amount = Number(amount);
	  const monthlyAPR = Number(interest) / 1200;
	  const numberMonths = Number(years);
	  const ratePower = Math.pow((1 + monthlyAPR), numberMonths);

	  const monthly = Amount * ((monthlyAPR * ratePower) / (ratePower - 1));
	  const totalPaymentCalculated = (monthly * numberMonths);

	  if ((isFinite(monthly))) {
		const totalInterestCalculated = (totalPaymentCalculated - Amount);

		setResults({
		  totalCurrentInterest: CurrencyFormatter.format( totalInterestCalculated),
		  totalCompareInterest: CurrencyFormatter.format(totalInterestCalculated),
		  totalSaveInterest: '0.0',
		  isResult: true,
		});
	  }
	}
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
					type='number'
					name='amount'
					placeholder='7500'
					value={userValues.amount}
					onChange={handleInputChange}
				/>
			  </FormInput>

			  <FormInput>
				<label>Interest Rate</label>
				<InputBox
					type='number'
					name='interest'
					step="0.1" min="0.0"
					placeholder='3.0'
					value={userValues.interest}
					onChange={handleInputChange}
				/>
			  </FormInput>

			  <FormInput>
				<label>Term<small> (in decimal format)</small></label>
				<InputBox
					type='number'
					name='years'
					placeholder='years'
					min='0.0'
					step='0.1'
					value={userValues.years}
					onChange={handleInputChange}
				/>
			  </FormInput>

			  <FormInput>
				<label>Comparison Rate</label>
				<InputBox
					type='text'
					name='rate_compare'
					placeholder='1.0'
					min='0'
					value={userValues.rate_compare}
					onChange={handleInputChange}
				/>
				<small> decimal input format</small>
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

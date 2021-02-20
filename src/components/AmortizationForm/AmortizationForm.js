import React, {useState} from 'react';
import {Result, ResultTable} from "./style";
import {
  FormWrapper,
  CalculationForm,
  CalculatorFormInput,
  FormTitle,
  Info,
  InfoPara,
  ResultSide,
  FormInput,
  InputWrapper, InputBox
} from "../styles/contants"
import BasicForm from "../BasicForm/BasicCalculation";

function AmortizationForm() {
  const [userValues, setUserValues] = useState({
	amount: '',
	interest: '',
	months: '',
  })

  const [results, setResults] = useState({
	paymentNumber: '',
	paymentAmount: '',
	totalInterest: '',
	totalPayment: '',
	balance: '',
  });

  const [error, setError] = useState('');

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

  const isValid = () => {
	const {amount, interest, months} = userValues;
	let actualError = '';

	if (isNaN(amount) || isNaN(interest) || isNaN(months)) {
	  actualError = 'All the values must be a valid number';
	}

	if (Number(amount) < 0 || Number(interest) < 0.0 || Number(months) < 0) {
	  actualError = 'All the values must be a positive number';
	}
	if (actualError) {
	  setError(actualError);
	  return false;
	}
	return true;
  };

  // Calculation
  const calculateResults = ({amount, interest, months}) => {
	if (Number(interest) > 0.0) {
	  const LoanAmount = Number(amount);
	  const monthlyAPR = Number(interest) / 1200;
	  const num_payments = Number(months);

	  const x = Math.pow(1 + monthlyAPR, -(num_payments));
	  const payment_amount = (LoanAmount * monthlyAPR) / (1 - x);

	  if (isFinite(payment_amount)) {
		const payment_amount_formatted = payment_amount.toFixed(2);

		const totalInterest = ((payment_amount * num_payments) - LoanAmount);
		const totalInterest_Formatted = totalInterest.toFixed(2);

		const totalPayment = (payment_amount * num_payments);
		const totalPayment_Formatted = totalPayment.toFixed(2);


		const interest_per_payment = (payment_amount - (LoanAmount / num_payments));
		const interest_per_payment_Formatted = (payment_amount - (LoanAmount / num_payments)).toFixed(2);
		const amount_from_balance = payment_amount - interest_per_payment;
		// let counter_interest = 0;
		// let counter_payment = 0;
		const counter_balance = parseInt(LoanAmount, 10);
		const count_balance = counter_balance - amount_from_balance;

		setResults({
		  // paymentNumber: '',
		  // paymentAmount: '',
		  // totalInterest: '',
		  // totalPayment: '',
		  // balance: '',
		  paymentNumber: num_payments,
		  paymentAmount: payment_amount_formatted,
		  totalInterest: interest_per_payment_Formatted,
		  totalPayment: totalPayment_Formatted,
		  balance: count_balance.toFixed(2),
		  isResult: true,
		});
	  }
	}
  }

	return (
		<FormWrapper>
		  <Info>
			<FormTitle>Interest Savings Calculation</FormTitle>
			<InfoPara>Grabs three values from the form, and displays a complete amortization schedule for the provided
			  loan information.</InfoPara>
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
					  step="0.1" min="0.0"
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
			  </InputWrapper>
			  <p className='error'>{error}</p>
			</CalculatorFormInput>

			<ResultSide>
			  <p><label>Results:</label></p>
			  <ResultTable>
				<Result>
				  <thead>
				  <tr>
					<th>#</th>
					<th>Payment Amt.</th>
					<th>Total Interest</th>
					<th>Total Payments</th>
					<th>Balance</th>
				  </tr>
				  </thead>
				  <tbody>
				  <tr>
					<td>{results.paymentNumber}</td>
					<td>{results.paymentAmount}</td>
					<td>{results.totalInterest}</td>
					<td>{results.totalPayment}</td>
					<td>{results.balance}</td>
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

export default AmortizationForm;

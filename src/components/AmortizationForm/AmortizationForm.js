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

function AmortizationForm() {
  const [userValues, setUserValues] = useState({
	amount: '',
	interest: '',
	years: '',
  })

  const [results, setResults] = useState({
	amortizationSchedule: []
  });

  const CurrencyFormatter = new Intl.NumberFormat('us-US', {
	style: 'currency',
	currency: 'USD',
  });

  const [error, setError] = useState('');

  function handleInputChange(event) {
	const value = event.target.value;
	setUserValues({
	  ...userValues,
	  [event.target.name]: Number(value)
	})
	event.preventDefault();
	if (isValid()) {
	  setError('');
	  calculateResults(userValues);
	}
  }

  const handleInputKeyPress = event => {
	if (event.key === 'Enter') {
	  console.log('Enter key pressed' + event.target.value);
	}
  }

  const isValid = () => {
	const {amount, interest, years} = userValues;
	let actualError = '';

	if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
	  actualError = 'All the values must be a valid number';
	}

	if (amount < 0 || interest < 0 || years < 0) {
	  actualError = 'All the values must be a positive number';
	}
	if (actualError) {
	  setError(actualError);
	  return false;
	}
	return true;
  };

  // Calculation
  const calculateResults = ({amount, interest, years}) => {
	  const principal = amount;
	  const monthlyAPR = interest/(100*12);
	  const durationMonths = years * 12;

	  // const monthly_payment_amount = (principal * (monthlyAPR +
		//   monthlyAPR / (Math.pow(monthlyAPR + 1, durationMonths) - 1)));
	const ratePower = Math.pow((1 + monthlyAPR), durationMonths);

	const monthly_payment_amount = principal * ((monthlyAPR * ratePower) / (ratePower - 1));
	// const monthly_payment_amount = principal * (monthlyAPR + monthlyAPR / (Math.pow(monthlyAPR + 1, durationMonths) - 1));

	  const amortizationSchedule = [];
	  for (let i = 0; i < durationMonths; i++) {
		const prevPrincipal =
			i === 0 ? principal : amortizationSchedule[i - 1].principalBalance;
		const interestPayment = prevPrincipal * monthlyAPR;
		const principalPayment = monthly_payment_amount - interestPayment;
		const principalBalance = Math.max(prevPrincipal - principalPayment, 0);
		const accInterest =
			(i === 0 ? 0 : amortizationSchedule[i - 1].accInterest) +
			interestPayment;

		amortizationSchedule.push({
		  paymentNumber: i + 1,
		  payment: monthly_payment_amount,
		  principalBalance: principalBalance,
		  interestPayment: interestPayment,
		  principalPayment: principalPayment,
		  accInterest: accInterest,

		  paymentRounded: CurrencyFormatter.format(monthly_payment_amount),
		  interestPaymentRounded: CurrencyFormatter.format(interestPayment),
		  principalPaymentRounded: CurrencyFormatter.format(principalPayment),
		  principalBalanceRounded: CurrencyFormatter.format(principalBalance),
		  accInterestRounded: CurrencyFormatter.format(accInterest),
		});
	  }
	  setResults({
		amortizationSchedule: amortizationSchedule,
	  });
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
					type='number'
					name='amount'
					placeholder='7500'
					value={userValues.amount}
					onChange={handleInputChange}
					onKeyPress={handleInputKeyPress}
				/>
			  </FormInput>
			  <FormInput>
				<label>Interest Rate</label>
				<InputBox
					type='number'
					name='interest'
					placeholder='3'
					value={userValues.interest}
					onChange={handleInputChange}
					onKeyPress={handleInputKeyPress}
				/>
			  </FormInput>
			  <FormInput>
				<label>Term<small> (in decimal format)</small></label>
				<InputBox
					type='number'
					name='years'
					placeholder='years'
					min='1.0'
					value={userValues.years}
					onChange={handleInputChange}
					onKeyPress={handleInputKeyPress}
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
				  <th>Payment</th>
				  <th>Principal</th>
				  <th>Interest</th>
				  <th>Balance</th>
				  {/*<th>Accumulated Interest</th>*/}
				</tr>
				</thead>
				<tbody>
				{results.amortizationSchedule.map(row => (
					<tr key={row.paymentNumber}>
					  <td>{row.paymentNumber}</td>
					  <td>{row.paymentRounded}</td>
					  <td>{row.principalPaymentRounded}</td>
					  <td>{row.interestPaymentRounded}</td>
					  <td>{row.principalBalanceRounded}</td>
					  {/*<td>{row.accInterestRounded}</td>*/}
					</tr>
				))}
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

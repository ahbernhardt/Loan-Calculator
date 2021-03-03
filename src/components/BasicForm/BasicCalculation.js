import React, {useState} from 'react';
import {
    FormWrapper,
    Info, FormTitle, InfoPara,
    CalculationForm,
    CalculatorFormInput,
    InputWrapper, FormInput, InputBox,
    ResultSide,

    ResultLabel
} from "../styles/contants"

function BasicForm() {
    // state to storage the values given by the user when filling the input fields
    const [userValues, setUserValues] = useState({
        amount: '',
        interest: '',
        years: ''
    })
    // state to storage the results of the calculation
    const [results, setResults] = useState({
        monthlyPayment: '',
        totalPayment: '',
        totalInterest: ''
    });

    // state to storage error message
    const [error, setError] = useState('');

    const CurrencyFormatter = new Intl.NumberFormat('us-US', {
        style: 'currency',
        currency: 'USD',
    });
    // event handler to update state when the user enters values
    function handleInputChange(event) {
        const value = event.target.value;
        setUserValues({
            ...userValues,
            [event.target.name]: parseFloat(value)
        })
        event.preventDefault();
        if (isValid()) {
            setError('')
            calculateResults(userValues);
        }
    }

    // Manage validations and error messages
    const isValid = () => {
        const {amount, interest, years} = userValues;
        let actualError ='';

        // if (!amount || !interest || !years) {
        //     actualError = 'All the values are required';
        // }

        if (isNaN(amount) || isNaN(interest) || isNaN(years) ){
            actualError = 'All the values must be a valid number';
        }

        if (Number(amount) < 0 || Number(interest) < 0 || Number(years) < 0) {
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
        const PrincipalAmount = amount;
        const monthlyRate = interest / (100 * 12);
        const numberMonths = years * 12;
        const ratePower = Math.pow((1 + monthlyRate), numberMonths);

        const monthly = PrincipalAmount * ((monthlyRate * ratePower) / (ratePower - 1));
        if (isFinite(monthly)) {
            const totalPaymentCalculated = (monthly * numberMonths);
            const totalInterestCalculated = (totalPaymentCalculated - PrincipalAmount);
            // Set up results to the state to be displayed to the user
            setResults({
                monthlyPayment: CurrencyFormatter.format(monthly),
                totalPayment: CurrencyFormatter.format(totalPaymentCalculated),
                totalInterest: CurrencyFormatter.format(totalInterestCalculated),
            });
        }
    }

    return (
    <FormWrapper>
        <Info>
            <FormTitle>Basic Loan Calculation</FormTitle>
            <InfoPara>Grabs three values from the form, and returns general information about a loan.</InfoPara>
        </Info>


        {/*<CalculationForm onSubmit={handleSubmitValues}>*/}
        <CalculationForm>
            <CalculatorFormInput>
                <InputWrapper>
                    <FormInput>
                        <label>Amount</label>
                           <InputBox
                               type='number'
                               name='amount'
                               placeholder='7500'
                               value={userValues.amount}
                               onChange={handleInputChange}
                               // onKeyPress={handleInputKeyPress}
                           />
                    </FormInput>
                    <FormInput>
                        <label>Interest Rate</label>
                        <InputBox
                            type='number'
                            name='interest'
                            placeholder='3'
                            inputmode='numeric'
                            pattern="[0-9]{.1}"
                            value={userValues.interest}
                            onChange={handleInputChange}
                            // onKeyPress={handleInputKeyPress}
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
                            inputmode='numeric'
                            value={userValues.years}
                            onChange={handleInputChange}
                            // onKeyPress={handleInputKeyPress}
                        />
                    </FormInput>
                </InputWrapper>
                <p className='error'>{error}</p>
            </CalculatorFormInput>

            <ResultSide>
                <ResultLabel>Results:</ResultLabel>
                <InputWrapper>
                    <FormInput>
                        <label>Months Payment</label>
                        <InputBox
                            type='text'
                            value={results.monthlyPayment}
                            disabled
                        />
                    </FormInput>
                    <FormInput>
                        <label>Total Interest</label>
                        <InputBox
                            type='text'
                            value={results.totalInterest}
                            disabled
                        />
                    </FormInput>
                    <FormInput>
                        <label>Amount + Interest</label>
                        <InputBox
                            type='text'
                            value={results.totalPayment}
                            disabled
                        />
                    </FormInput>
                </InputWrapper>
            </ResultSide>
        </CalculationForm>

    </FormWrapper>
    );
}

export default BasicForm;

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
        months: '',
    })
    // state to storage the results of the calculation
    const [results, setResults] = useState({
        monthlyPayment: '',
        totalPayment: '',
        totalInterest: '',
    });

    // state to storage error message
    const [error, setError] = useState('');

    // event handler to update state when the user enters values
    function handleInputChange (event) {
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
    const calculateResults = ({amount, interest, months}) => {

        if(Number(interest) > 0){
            const PrincipalAmount = Number(amount);
            const monthlyAPR = Number(interest) / 1200;
            const numberMonths = Number(months);
            const x = Math.pow(1 + monthlyAPR, -(numberMonths));
            const monthly = (PrincipalAmount * monthlyAPR) / (1 - x);

            if (isFinite(monthly)) {
                const monthlyPaymentCalculated = monthly.toFixed(2);
                const totalPaymentCalculated = (monthly * numberMonths).toFixed(2);
                const totalInterestCalculated = (totalPaymentCalculated - PrincipalAmount).toFixed(2);

                // Set up results to the state to be displayed to the user
                setResults({
                    monthlyPayment: monthlyPaymentCalculated,
                    totalPayment: totalPaymentCalculated,
                    totalInterest: totalInterestCalculated,
                    isResult: true,
                });
            }
        } else if ((Number(interest) === 0.0) && ((Number(amount) % Number(months)) === 0)) {
            const PrincipalAmount = Number(amount);
            const numberMonths = Number(months);
            const monthly = PrincipalAmount/ numberMonths;

            if (isFinite(monthly)) {
                const monthlyPaymentCalculated = monthly.toFixed(2);
                const totalPaymentCalculated = (monthly * numberMonths).toFixed(2);
                const totalInterestCalculated = (monthly * numberMonths - PrincipalAmount).toFixed(2);

                // Set up results to the state to be displayed to the user
                setResults({
                    monthlyPayment: monthlyPaymentCalculated,
                    totalPayment: totalPaymentCalculated,
                    totalInterest: totalInterestCalculated,
                    isResult: true,
                });
            }
        }
        // return;
    };

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
                        <label>Total Amount + Interest</label>
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

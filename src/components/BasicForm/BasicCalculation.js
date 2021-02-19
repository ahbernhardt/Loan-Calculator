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
        years: '',
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
        const {amount, interest, years} = userValues;
        let actualError = '';
        // Validate if there are values
        if (!amount || !interest || !years) {
            actualError = 'All the values are required';
        }
        // Validate if the values are numbers
        if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
            actualError = 'All the values must be a valid number';
        }
        // Validate if the values are positive numbers
        if (Number(amount) < 0 || Number(interest) < 0 || Number(years) < 0) {
            actualError = 'All the values must be a positive number';
        }
        if (actualError) {
            setError(actualError);
            return false;
        }
        return true;
    };

    // // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
    // function handleSubmitValues(e){
    //     e.preventDefault();
    //     if (isValid()) {
    //         setError('');
    //         calculateResults(userValues);
    //     }
    // }

    // Calculation
    const calculateResults = ({amount, interest, years}) => {
        const PrincipalAmount = Number(amount);
        const monthlyAPR = Number(interest) / 1200;
        const numberMonths = Number(years) * 12;

        // (PrincipalAmount * monthlyAPR) / (1 - Math.pow(1 + monthlyAPR, -NumberOfMonths))
        const x = Math.pow(1 + monthlyAPR, -(numberMonths));
        const monthly = (PrincipalAmount * monthlyAPR) / (1 - x);

        if (isFinite(monthly)) {
            const monthlyPaymentCalculated = monthly.toFixed(2);
            const totalPaymentCalculated = (monthly * numberMonths).toFixed(2);
            const totalInterestCalculated = (
                monthly * numberMonths -
                PrincipalAmount
            ).toFixed(2);

            // Set up results to the state to be displayed to the user
            setResults({
                monthlyPayment: monthlyPaymentCalculated,
                totalPayment: totalPaymentCalculated,
                totalInterest: totalInterestCalculated,
                isResult: true,
            });
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
                        <label>Loan Amount:</label>
                           <InputBox
                               type='text'
                               name='amount'
                               placeholder='7,500'
                               value={userValues.amount}
                               onChange={handleInputChange}
                           />
                    </FormInput>
                    <FormInput>
                        <label>Rate (APR):</label>
                        <InputBox
                            type='text'
                            name='interest'
                            placeholder='7%'
                            value={userValues.interest}
                            onChange={handleInputChange}
                        />
                    </FormInput>
                    <FormInput>
                        <label>Term:<small> (# of year)</small></label>
                        <InputBox
                            type='text'
                            name='years'
                            placeholder='36m'
                            value={userValues.years}
                            onChange={handleInputChange}
                        />
                    </FormInput>
                </InputWrapper>
                <p className='error'>{error}</p>
            </CalculatorFormInput>

            <ResultSide>
                <ResultLabel>Results:</ResultLabel>
                {/*<h4>*/}
                {/*    Loan amount: ${userValues.amount} <br/> Interest:{' '}*/}
                {/*    {userValues.interest}% <br/> Years to repay: {userValues.years}*/}
                {/*</h4>*/}
                <InputWrapper>
                    <FormInput>
                        <label>Months Payment:</label>
                        <InputBox
                            type='text'
                            value={results.monthlyPayment}
                            disabled
                        />
                    </FormInput>
                    <FormInput>
                        <label>Total Payment:</label>
                        <InputBox
                            type='text'
                            value={results.totalPayment}
                            disabled
                        />
                    </FormInput>
                    <FormInput>
                        <label>Total Interest:</label>
                        <InputBox
                            type='text'
                            value={results.totalInterest}

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

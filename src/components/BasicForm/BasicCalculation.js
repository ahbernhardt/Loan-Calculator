import React from 'react';
import {BasicFormWrapper, CalculationForm, CalculatorFormInput, FormInput, FormTitle, Info, ResultSide} from "./style";

export default function BasicForm() {
    return (
    <BasicFormWrapper>
        <Info>
            <FormTitle>Basic Loan Calculation</FormTitle>
            <p>Grabs three values from the form, and returns general information about a loan.</p>
        </Info>

        <CalculationForm>
            <CalculatorFormInput>
                <FormInput className="accrue-field-amount">
                    <p><label>Loan Amount:</label>
                       <input type="text" className="amount" value="7,500" />
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
            </CalculatorFormInput>

            <ResultSide>
                <p><label>Results:</label></p>
                <div className="results"/>
            </ResultSide>
            <div className="clear"/>
        </CalculationForm>
    </BasicFormWrapper>
    )
}

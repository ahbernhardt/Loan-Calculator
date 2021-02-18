import styled from 'styled-components'
import {colors} from "../color";

export const AmortizationFormWrapper = styled.div`
	display: block;
	color: ${colors.slate};
`
export const Info = styled.div`
	display: block;
`

export const FormTitle = styled.h2`
	color: ${colors.white};
	
`
export const CalculationForm = styled.div`
	display: flex;
`
export const CalculatorFormInput = styled.div`
	display: block;
	width: 30%;
	margin-right: 35px;
`
export const FormInput = styled.div`
	display: block;
	margin: 5px 0;
	
	label {
	  margin-top: 20px;
	  margin-bottom: 5px;
	  display: block;
	}
	
	input[type=text] {
	  box-sizing: border-box;
	  width: 100%;
	  padding: 5px 10px;
	  font-size: 110%;
	  border: 0;
	}
	
	small {
	  font-size: .85em;
	  color: lighten( $grey, 10% );
	}
`
export const ResultSide = styled.div`
	display: block;
	margin: 20px 0;
	
	label{
		color: ${colors.green}
	}
`
export const ResultTable = styled.div`

`
export const Result = styled.table`
	min-width: 100%;
	background: ${colors.greentint};
	border: solid 1px ${colors.green};
	padding: 20px/2 20px;
    margin-top: 5px;
    overflow: auto;
    color: ${colors.lightestslate};
    
	th {
	  white-space: nowrap;
	  padding: 2px 10px;
	  border-right: solid 1px ${colors.lightnavy};
	  border-bottom: solid 1px ${colors.lightestslate};
	}

	td {
	  padding: 2px;
	  text-align: center;
	  border-right: solid 1px ${colors.lightnavy};
	}
`

import styled from 'styled-components'
import {colors} from "../color";

export const InterestFormWrapper = styled.div`
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

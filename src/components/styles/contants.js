import styled from 'styled-components'
import {colors} from "./color";

export const FormWrapper = styled.div`
	display: block;
	color: ${colors.slate};
	padding-bottom: 75px;
`
export const Info = styled.div`
	display: block;
`
export const InfoPara = styled.p`
	margin-left: 25px;
	color: ${colors.slate};
	
	::before {
	  content: "▹";
	  position: absolute;
	  margin-left: -25px;
	  color: ${colors.green};
	}
`

export const FormTitle = styled.h2`
	color: ${colors.white};
`

export const CalculationForm = styled.div`
	display: block;
	margin-top: 50px;
`
export const CalculatorFormInput = styled.div`
	display: block;
	width: 100%;
	margin-bottom: 45px;
`
export const InputWrapper = styled.div`
	display: flex;
	width: 100%;
`
export const FormInput = styled.div`
	display: block;
	
	label {
	  font-size: .85em;
	  margin-bottom: 5px;
	  display: block;
	  color: ${colors.lightestslate}
	}
	
	small {
	  font-size: .75em;
	  color: lighten( $grey, 10% );
	}
`
export const InputBox = styled.input`
	  box-sizing: border-box;
	  width: 90%;
	  padding: 5px 10px;
	  font-size: 100%;
	  color: ${colors.slate};
	  border: 2px solid ${colors.greentint};
  	  border-radius: 4px;
  	  background: transparent;
`

export const ResultSide = styled.div`
	display: block;
`

export const ResultLabel = styled.h3`
	color: ${colors.green}
	font-size: 18px;
`

import styled from 'styled-components'
import {colors} from "../styles/color";

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
	  text-align: center;
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

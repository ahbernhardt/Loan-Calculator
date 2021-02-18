import styled from "styled-components";
import {colors} from "../color";

export const Section = styled.section`
	height: auto;
	width: 100%;
	padding: 0 2% 0 2%;
`

export const SectionTitle = styled.h1`
	width: 100%;
	display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    margin: 40px 15px 50px;
    width: 100%;
    font-size: clamp(26px,5vw,32px);
    white-space: nowrap;
	color: ${colors.lightestslate};
	
	::before{
	  position: relative;
	  bottom: 4px;
	  counter-increment: section 1;
	  content: "" counter(section) ".";
	  margin-right: 10px;
	  color: ${colors.green};
	  font-size: clamp(16px,3vw,20px);
	  font-weight: 400;
    }
	::after{
	  content: "";
	  display: block;
	  position: relative;
	  top: 2px;
	  width: 850px;
	  height: 1px;
	  margin-left: 20px;
	  background-color: ${colors.lightestnavy};
    }
`

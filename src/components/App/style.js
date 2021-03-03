import styled from "styled-components";
import {colors} from "../styles/color";

export const Section = styled.section`
	width: 100%;
	height: auto;
	padding: 0 15% 15px 15%;
	counter-increment: section 1;
	color: ${colors.slate};
`

export const SectionTitle = styled.h1`
	width: 100%;
	display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    margin: 40px 15px 50px;
    font-size: clamp(26px,5vw,32px);
    white-space: nowrap;
	color: ${colors.lightestslate};
	
	::before{
	  position: relative;
	  bottom: 4px;
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
export const Footer = styled.footer`
	text-align: center;
	padding: 1rem 0 2rem 0;
	font-size: 1rem;
	color: ${colors.slate};

   a {
	margin-left: .5rem;
   }

  span {
	display: inline-block;
	margin-right: .5rem;
	color: ${colors.green};
  }

  i {
	font-size: 1.8rem;
	margin-right: 4px;
  }

  span:hover{
	color:  ${colors.greentint};
  }
`

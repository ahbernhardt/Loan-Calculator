import "../../style.scss";
import React from 'react';
import {Tabs, TabList, Tab, PanelList, Panel} from "react-tabtab";
import customStyle from '../TabStyles';
import BasicForm from "../BasicForm/BasicCalculation";
import InterestForm from "../InterestForm/InterestForm";
import AmortizationForm from "../AmortizationForm/AmortizationForm";
import {Section, SectionTitle} from "./style";
import { Info, InfoPara} from "../styles/contants";

export default function App(){
  return (
      <div className="App">
        <Section>
          <SectionTitle>Background</SectionTitle>
          <Info>
            <p>This is a ReactJS App for providing loan and interest calculations on web pages. It's small, fast, flexible, and forgiving.</p>
            <InfoPara>Small: The minified version of the plugin is under 5kb.</InfoPara>
            <InfoPara>Fast: It loads and executes quickly, and instantly provides results as your user types.</InfoPara>
            <InfoPara>Flexible: Don't want it to calculate on keyup? There's a setting for that. Want to execute your own code every time the the tool calculates? Just provide a callback function. With every setting in the plugin accessible, you can completely customize the experience.</InfoPara>
            <InfoPara>Forgiving: If you don't provide it with fields that are required to perform calculations, it will add them to the bottom of the form. If you don't provide it with a form or results div to begin with, you guessed it - it creates them. It will operate when trained on a completely empty div or use any fields you provide yourself.</InfoPara>
          </Info>
        </Section>
        <Section>
            <SectionTitle>Calculation Demos</SectionTitle>
              <Tabs customStyle={customStyle} >
                  <TabList>
                    <Tab>Basic Loan Calculation</Tab>
                    <Tab>Interest Savings Calculation</Tab>
                    <Tab>Amortization Schedule Calculation</Tab>
                  </TabList>

                  <PanelList>
                    <Panel>
                      <BasicForm />
                    </Panel>
                    <Panel>
                     <InterestForm/>
                    </Panel>
                    <Panel>
                      <AmortizationForm />
                    </Panel>
                  </PanelList>
              </Tabs>
          </Section>
      </div>
  )
}

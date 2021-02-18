import styled from 'styled-components';
import { styled as styledTabTab } from 'react-tabtab';
import {colors} from './color'

let {TabListStyle, ActionButtonStyle, TabStyle, PanelStyle} = styledTabTab;

TabListStyle = styled(TabListStyle)`
  background-color: transparent;
  border: 0;
  width: 30%;
`;

TabStyle = styled(TabStyle)`
  transition: color .28s ease;
  color: ${colors.slate};
  display: block;
  z-index: 5;
  border-left: 1px solid  ${colors.lightestnavy};
  ${props => props.active && !props.vertical ?
    `
      border-left: 2px solid ${colors.green};
      color:  ${colors.green};
    `
    : null}
  &:hover {
    background-color:  ${colors.greentint};
    color:  ${colors.green};
    border-left: 2px solid  ${colors.green};
  }
`;

ActionButtonStyle = styled(ActionButtonStyle)`
  background-color: transparent;
  border: transparent;
  z-index: -3;
  // border-right: 1px solid  ${colors.lightestnavy};
`;

PanelStyle = styled(PanelStyle)`
  width: 70%;
  align-items: right;
  right: 0;
  margin-top: -15%;
  margin-left: 28%;
  transition: box-shadow .25s, -webkit-box-shadow .25s;
  background-color: transparent;
`;

export default {
    TabList: TabListStyle,
    ActionButton: ActionButtonStyle,
    Tab: TabStyle,
    Panel: PanelStyle
}

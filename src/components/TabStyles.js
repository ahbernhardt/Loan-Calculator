import styled from 'styled-components';
import { styled as styledTabTab } from 'react-tabtab';
import {colors} from './styles/color'

let {TabListStyle, ActionButtonStyle, TabStyle, PanelStyle} = styledTabTab;

TabListStyle = styled(TabListStyle)`
  background-color: transparent;
  border: 0;
  width: 360px;
  margin-left: -25px;
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
  right: 0;
  margin-top: -175px;
  margin-left: 350px;
  transition: box-shadow .25s, -webkit-box-shadow .25s;
  background-color: transparent;
  // border: 1px solid  ${colors.lightestnavy};
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    TabList: TabListStyle,
    ActionButton: ActionButtonStyle,
    Tab: TabStyle,
    Panel: PanelStyle
}

import { css } from "styled-components";

const sizes = {
  mobile: 576,
  tablet: 768,
  large: 1024,
  xlarge: 1280,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
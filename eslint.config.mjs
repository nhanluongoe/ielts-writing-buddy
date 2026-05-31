import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = [
  ...nextCoreWebVitals,
  prettierRecommended,
  {
    rules: {
      'react/no-children-prop': 'off',
    },
  },
];

export default eslintConfig;

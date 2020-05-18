import React from 'react';
import PropTypes from 'prop-types';

//import logo from '~/assets/logo.png';

export default function Logo({ width }) {
  return <img src="" width={width} alt="Instituto Paulo Freire" />;
}

Logo.propTypes = {
  width: PropTypes.number,
};

Logo.defaultProps = {
  width: 200,
};

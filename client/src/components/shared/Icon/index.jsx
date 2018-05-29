import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, size, color }) => {
  const ownStyles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: color,
    },
  };

  return (
    <svg
      style={ownStyles.svg}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24">
      <path style={ownStyles.path} d={icon} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
  size: 20,
  color: '#000',
};

export default Icon;

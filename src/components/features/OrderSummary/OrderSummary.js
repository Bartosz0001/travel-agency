import React from 'react';
import {Row, Col} from 'react-flexbox-grid';
import styles from './OrderSummary.scss';
import PropTypes from 'prop-types';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';

const OrderSummary = ({tripCost, options}) => {
  return(
    <Row>
      <Col xs={12}>
        <h2 className={styles.component}>Total: <strong>${calculateTotal(formatPrice(tripCost), options)}</strong></h2>
      </Col>
    </Row>
  )
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
}

export default OrderSummary;
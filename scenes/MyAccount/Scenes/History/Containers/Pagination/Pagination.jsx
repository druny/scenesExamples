import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./styles.scss"

const nextPageStyles = classNames(styles.pageArrows, styles.nextPage);
const prevPageStyles = classNames(styles.pageArrows, styles.prevPage);

class Pagination extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    step: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    currentPage: 1,
  };

  onMove = (page) => {
    const { data, step, onChange } = this.props;

    const nextStartOffset = (page - 1) * step;

    if (page > 0 && nextStartOffset < data.length) {
      const paginatedData = _.slice(data, nextStartOffset, nextStartOffset + step);

      this.setState({ currentPage: page });

      onChange(paginatedData);
    }
  };

  getButtonContent = (pageNumber, className) => (
    <button
      key={pageNumber}
      className={className}
      onClick={() => this.onMove(pageNumber)}
    >
      <p>{pageNumber}</p>
    </button>
  );

  render() {
    const { currentPage } = this.state;
    const { step, data } = this.props;

    const moveButtonList = [];
    const lastNumber = Math.floor(data.length / step);

    for (let pageOffset = 0; pageOffset < 3; pageOffset += 1) {
      const pageNumber = currentPage + pageOffset;

      const className = currentPage === pageNumber
        ? styles.current
        : styles.next;

      const nextStartOffset = (pageNumber - 1) * step;
      const isDisplayNextPage = data.length > nextStartOffset;

      if (pageNumber >= lastNumber && pageNumber > 0 && isDisplayNextPage) {
        moveButtonList.push(this.getButtonContent(pageNumber, className));

      } else if (data.length >= pageNumber * step) {
        // eslint-disable-next-line
        isDisplayNextPage
          ? moveButtonList.push(this.getButtonContent(pageNumber, className))
          : moveButtonList.unshift(this.getButtonContent(pageNumber - 2, className));
      }
    }

    const notAllowedCursor = { cursor: "not-allowed" };

    const nextButtonStyles = data.length <= currentPage * step
      ? notAllowedCursor
      : {};
    const prevButtonStyles = currentPage === 1
      ? notAllowedCursor
      : {};

    return (
      <div className={styles.pagination}>
        <button
          style={prevButtonStyles}
          className={prevPageStyles}
          onClick={() => this.onMove(currentPage - 1)}
        />
        <div className={styles.numbersView}>
          {
            moveButtonList
          }
        </div>
        <button
          style={nextButtonStyles}
          className={nextPageStyles}
          onClick={() => this.onMove(currentPage + 1)}
        />
      </div>
    )
  }
}

export default Pagination;

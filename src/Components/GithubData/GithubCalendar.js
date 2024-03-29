import React from 'react';
import {
  getCellPosition,
  createCells,
  createWeekLabels,
  createMonthLabels,
} from './utils';

import {
  MAP_CONTRIBUTION_QUARTILE_TO_LEVEL,
  WEEK_NAMES,
  DEFAULT,
} from './constants';

export const GithubCalendar = ({ data }) => {
  const {
    user: {
      contributionsCollection: {
        contributionCalendar: { weeks, months },
      },
    },
  } = data;

  const getPosition = ({ x, y }) => {
    return getCellPosition({
      x,
      y,
      cellSize: DEFAULT.CELL_SIZE,
      cellMargin: DEFAULT.CELL_MARGIN,
      xLabelWidth: DEFAULT.X_LABEL_WIDTH,
      yLabelHeight: DEFAULT.Y_LABEL_HEIGHT,
    });
  };

  function getDimensions() {
    return {
      width:
        weeks.length * (DEFAULT.CELL_SIZE + DEFAULT.CELL_MARGIN) +
        DEFAULT.X_LABEL_WIDTH,
      height:
        7 * (DEFAULT.CELL_SIZE + DEFAULT.CELL_MARGIN) + DEFAULT.Y_LABEL_HEIGHT,
    };
  }

  function getLegendDimensions() {
    return {
      width: getDimensions().width,
      height: DEFAULT.CELL_SIZE + DEFAULT.CELL_MARGIN,
    };
  }

  const { width, height } = getDimensions();
  const { width: legendWidth, height: legendHeight } = getLegendDimensions();

  const labelStyleProps = {
    fontSize: `${DEFAULT.LABEL_FONT_SIZE}px`,
    fill: 'var(--color-font)',
  };

  const cellStyleProps = {
    strokeWidth: '1px',
    stroke: 'var(--color-calendar-graph-cell-outline)',
  };

  return (
    <div
      style={{
        maxWidth: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        width: 'min-content',
        margin: 'auto',
        height: `${height + DEFAULT.Y_LABEL_HEIGHT + 10}px`,
      }}
    >
      <svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
        {createCells({
          weeks,
          getCellPosition: getPosition,
          cellSize: DEFAULT.CELL_SIZE,
          getRectColor: ({ contributionLevel }) => {
            const level = MAP_CONTRIBUTION_QUARTILE_TO_LEVEL[contributionLevel];

            return DEFAULT.THEME[level];
          },
          styleProps: cellStyleProps,
        })}
        {createWeekLabels({
          weekNames: WEEK_NAMES,
          getLabelPosition: ({ x, y }) => {
            const { x: cellPosX, y: cellPosY } = getPosition({ x, y });

            return {
              x: cellPosX - DEFAULT.CELL_MARGIN - 1,
              y: cellPosY + DEFAULT.CELL_SIZE / 2,
            };
          },
          styleProps: labelStyleProps,
        })}
        {createMonthLabels({
          months,
          getLabelPosition: (() => {
            let labelSpace = 0;

            return function ({ x, y }) {
              labelSpace =
                labelSpace + (DEFAULT.CELL_SIZE + DEFAULT.CELL_MARGIN) * x;

              const { y: cellPosY } = getPosition({ x, y });

              return {
                x: DEFAULT.X_LABEL_WIDTH + labelSpace + DEFAULT.CELL_MARGIN,
                y: cellPosY - DEFAULT.CELL_MARGIN * 2,
              };
            };
          })(),
          styleProps: labelStyleProps,
        })}
      </svg>
      <svg
        width={legendWidth}
        height={legendHeight + 20}
        viewBox={`0 0 ${legendWidth} ${legendHeight}`}
      >
        <text
          x={legendWidth - DEFAULT.THEME.length * 13 - DEFAULT.CELL_SIZE - 50}
          y="10"
          style={labelStyleProps}
        >
          Less
        </text>
        <g
          style={{
            transform: `translateX(${
              width - DEFAULT.THEME.length * DEFAULT.CELL_SIZE - 30
            }px)`,
          }}
        >
          {DEFAULT.THEME.map((color, index) => (
            <rect
              key={`legend-${index}`}
              x={index * 13 - DEFAULT.CELL_SIZE}
              y={0}
              width={DEFAULT.CELL_SIZE}
              height={DEFAULT.CELL_SIZE}
              fill={color}
              style={cellStyleProps}
              rx={3}
              ry={3}
            />
          ))}
        </g>
        <text x={legendWidth - 30} y="10" style={labelStyleProps}>
          More
        </text>
      </svg>
    </div>
  );
};

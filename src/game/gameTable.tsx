import { Result } from 'antd';
import { TableOutlined } from '@ant-design/icons';
import { Button } from '@mui/material';

import { GameClient } from '../common/gameClient';
import { useGameTableStyles } from './gameTableStyles';

interface Properties {
  gameMap: string[];
}

const onCellClick = (y: number, x: number) => GameClient.socket.send(`open ${x} ${y}`);

export function GameTable({ gameMap }: Properties) {
  const classes = useGameTableStyles();

  const renderMap = (items: string[]) => {
    return items.map((item: string, rowIndex: number) => {
      const squares = [...item];
      const row = squares.map((square: any, columnIndex: number) => {
        const key = `square-${rowIndex}-${columnIndex}`;
        const testId = `square-${rowIndex}-${columnIndex}`;

        if (square !== '□') {
          return (
            <Button
              variant="outlined"
              color={square === '*' ? 'error' : 'success'}
              onClick={() => onCellClick(rowIndex, columnIndex)}
              key={key}
              className={classes.cell}
              data-testid={testId}
            >
              <p className={classes.text}>{square}</p>
            </Button>
          );
        }
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onCellClick(rowIndex, columnIndex)}
            key={key}
            className={classes.cell}
            data-testid={testId}
          />
        );
      });

      return (
        // eslint-disable-next-line react/no-array-index-key
        <div className={classes.row} key={`square-row-${rowIndex}`}>
          {row}
        </div>
      );
    });
  };

  if (gameMap.length === 0) {
    return <Result icon={<TableOutlined />} title="Press START and start playing Minesweeper!" />;
  }

  return <>{renderMap(gameMap)}</>;
}

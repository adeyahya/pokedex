import React from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from "@material-ui/core/styles";

import objectKeyNormalizer, { isObject, isArray, isString } from '../utils/objectNormalizer';

type Props = {
  object: Object,
}

const normalize = objectKeyNormalizer(['__typename', 'id', 'name']);

const ScoreWrapper = styled.div`
  padding: 4px 10px;
`;

const ScoreHeader = styled.span`
  font-weight: bold;
  border-top: solid black 1px;
  border-bottom: solid black 1px;
  padding: 4px 8px;
`;

const ScoreBody = styled.div`
  padding: 8px;
`;

const renderValue = (value: any) => {
  if (isString(value)) return value;
  
  if (isObject(value)) {
    return (
      <div>
        {Object.keys(value).map(key => (
          <ScoreWrapper key={key}>
            <ScoreHeader>{key}</ScoreHeader>
            <ScoreBody>{renderValue(value[key])}</ScoreBody>
          </ScoreWrapper>
        ))}
      </div>
    );
  }

  if (isArray(value)) {
    return (
      <List>
        {value.map((item, idx) => (
          <ListItem style={{borderTop: '1px solid black'}} key={idx}>
            {renderValue(item)}
          </ListItem>
        ))}
      </List>
    )
  }

  return value;
}

const ObjectTable = (props: Props) => {
  const targetObject = normalize(props.object);
  console.log(targetObject);
  return (
    <Table>
      <TableBody>
        {Object.keys(targetObject).map(key => (
          <TableRow key={key}>
            <TableCell component="th" scope="row">
              {key}
            </TableCell>
            <TableCell align="left">{renderValue(targetObject[key])}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ObjectTable;
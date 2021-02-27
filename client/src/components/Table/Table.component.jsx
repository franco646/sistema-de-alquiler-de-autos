import React from 'react';
import Table from 'react-bootstrap/Table';

const table = (props) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        {props.items.map((item) => <th key={item}>{item}</th>)}
      </tr>
    </thead>
    <tbody>
      {props.children}
    </tbody>
  </Table>
);

export default table;

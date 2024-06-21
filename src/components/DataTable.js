import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f4f4f4;
  color: #333;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const DataTable = ({ data }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Date</Th>
          <Th>Cases</Th>
          <Th>Deaths</Th>
        </Tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <Tr key={entry.date}>
            <Td>{entry.date}</Td>
            <Td>{entry.cases}</Td>
            <Td>{entry.deaths}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;

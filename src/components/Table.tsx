import { Table } from "semantic-ui-react";
interface Props {
  data: Array<{
    parameter: string;
    unit: string;
    value: number;
    lastUpdated: string;
  }>;
}
const CommonTable: React.FC<Props> = ({ data }) => (
  <div
    style={data.length > 5 ? { maxHeight: "300px", overflowY: "scroll" } : {}}
  >
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Sl.</Table.HeaderCell>
          <Table.HeaderCell>Parameter</Table.HeaderCell>
          <Table.HeaderCell>Unit</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, i) => (
          <Table.Row key={i}>
            <Table.Cell>#{i + 1}</Table.Cell>
            <Table.Cell>{row.parameter}</Table.Cell>
            <Table.Cell>{row.unit}</Table.Cell>
            <Table.Cell>{row.value}</Table.Cell>
            <Table.Cell>{new Date(row.lastUpdated).toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

export default CommonTable;

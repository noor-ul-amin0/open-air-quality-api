import { Message } from "semantic-ui-react";

interface Props {
  city: string;
  total: number;
}

const MessageHeader: React.FC<Props> = ({ city, total }) => {
  return (
    <Message>
      <Message.Header as="h2">
        <div style={{ textAlign: "left" }}>
          <strong>City: {city}</strong>
          <br />
          <strong>Total: {total}</strong>
        </div>
      </Message.Header>
    </Message>
  );
};

export default MessageHeader;

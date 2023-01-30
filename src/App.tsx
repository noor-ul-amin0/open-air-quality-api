import React, { useState } from "react";
import {
  Form,
  Button,
  Header,
  Image,
  Grid,
  Container,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Table from "./components/Table";
import MessageHeader from "./components/MessageHeader";
import InputField from "./components/InputField";

const API_URL = "https://api.openaq.org/v2/latest";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [{ city1, city2 }, setState] = useState({
    city1: {
      value: "",
      error: null,
      results: [],
      city: "",
    },
    city2: {
      value: "",
      error: null,
      results: [],
      city: "",
    },
  });
  const toggleLoader = (state: boolean) =>
    setLoading((prevState) => state ?? !prevState);
  const fetchAQByCity = async (state: string, city: string) => {
    try {
      const response = await fetch(`${API_URL}?city=${city}`);
      const json = await response.json();
      if (json && json.results.length) {
        setState((prevState) => ({
          ...prevState,
          [state]: {
            ...prevState[state],
            city,
            results: json.results.reduce((acc, { measurements }) => {
              acc = [...acc, ...measurements];
              return acc;
            }, []),
          },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          [state]: {
            ...prevState[state],
            error:
              "No data available for the selected city. Please try again later or with a different city.",
          },
        }));
      }
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        [state]: {
          ...prevState[state],
          error: `Error fetching data for ${city}: ${e}`,
        },
      }));
    } finally {
      toggleLoader(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city1.value && !city2.value) {
      setState((prevState) => ({
        ...prevState,
        city1: {
          ...prevState.city1,
          error: "Please enter city 1 value",
        },
        city2: {
          ...prevState.city2,
          error: "Please enter city 2 value",
        },
      }));
    } else {
      toggleLoader(true);
      if (city1.value) {
        fetchAQByCity("city1", city1.value);
      }
      if (city2.value) {
        fetchAQByCity("city2", city2.value);
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: {
        value,
        error: null,
        results: [],
        city: "",
      },
    }));
  };
  return (
    <div
      style={{
        background: "#ddd",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Header as="h2" textAlign="center">
        <Image src="https://api.openaq.org/openaq-logo.svg" />
        Air Quality Assessment Tool
      </Header>
      <Form
        onSubmit={handleSubmit}
        style={{
          padding: "2em",
          margin: "0 auto",
          maxWidth: "450px",
          marginBottom: "25px",
        }}
      >
        <InputField
          placeholder="Please enter City 1"
          label="City 1"
          value={city1.value}
          name="city1"
          onChange={handleChange}
          error={city1.error}
        />
        <InputField
          placeholder="Please enter City 2"
          label="City 2"
          value={city2.value}
          name="city2"
          onChange={handleChange}
          error={city2.error}
        />
        <Button type="submit" primary loading={loading}>
          Compare Air Quality
        </Button>
      </Form>
      <Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <MessageHeader city={city1.city} total={city1.results.length} />
              <Table data={city1.results} />
            </Grid.Column>
            <Grid.Column>
              <MessageHeader city={city2.city} total={city2.results.length} />
              <Table data={city2.results} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default App;

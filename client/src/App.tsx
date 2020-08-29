import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import moment from "moment";
import React from "react";
import MonthlyCalendar from "./MonthlyCalendar/MonthlyCalendar";

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => {
  const currentTime = moment();
  return (
    <ApolloProvider client={client}>
      <MonthlyCalendar currentTime={currentTime} />
    </ApolloProvider>
  );
};

export default App;

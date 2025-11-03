import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  {
  books{
    id
    title
    price
  }
}
`;
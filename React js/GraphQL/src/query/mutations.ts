import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBookInPostgrs($addBookArgs:AddBookArgs!){
  	addBook(addBookArgs:$addBookArgs)
}
`;
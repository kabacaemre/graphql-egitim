import { gql } from 'apollo-boost';

// user mutations

export const newUserMutation = gql`
	mutation($username: String!, $password: String!) {
		createUser(data: { username: $username, password: $password }) {
			token
		}
	}
`;
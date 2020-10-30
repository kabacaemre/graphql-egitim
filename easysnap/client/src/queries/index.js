import { gql } from 'apollo-boost';

// user mutations

export const newUserMutation = gql`
	mutation($username: String!, $password: String!) {
		createUser(data: { username: $username, password: $password }) {
			token
		}
	}
`;

// singin mutations

export const signInMutation = gql`
	mutation($username: String!, $password: String!) {
		signIn(data: { username: $username, password: $password }) {
			token
		}
	}
`;

// activeUser query

export const getActiveUser = gql`
	query{
		activeUser{
			id
			username
			createdAt
			snaps{
				text
				createdAt
			}
		}
	}
`;

// getSnaps query

export const getSnaps = gql`
	query {
		snaps {
			id
			text
			createdAt 
			user {
				id
				username
			}
		}
	}
`;

// add snap mutation

export const addSnapMutation = gql`
	mutation($user_id: ID!, $text: String!) {
		createSnap ( data: {
			user_id: $user_id
			text: $text
		}) {
			id
			text
			createdAt
			user{
				id
				username
			}
		}
	}
`;

// user created subscription

export const userCreated = gql`
	subscription{
		user{
			id
			username
		}
	}
`;

// snap created subscription

export const snapCreated = gql`
	subscription($userId: ID){
		snap(userId: $userId){
			id
			text
			createdAt
			user{
				id
				username
			}
		}
	}
`;
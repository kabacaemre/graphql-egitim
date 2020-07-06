import { gql } from 'apollo-boost';

export const getMoviesQuery = gql`
{
  movies {
      id,
      title,
      description
  }
}
`;

export const getDirectorsQuery = gql`
{
  directors {
      id,
      name
  }
}
`;

export const getMovieQuery = gql`
	query($id: ID){
		movie(id: $id){
			id,
      title,
      year,
			description,
			director{
				name,
				movies{
          id
					title
				}
			}
		}
	}
`;

export const newMovieMutation = gql`
  mutation($title: String!, $description: String, $year: Int!, $directorId: String!) {
      addMovie(title:$title, description:$description, year:$year, directorId:$directorId) {
        title
      }
  }
`;
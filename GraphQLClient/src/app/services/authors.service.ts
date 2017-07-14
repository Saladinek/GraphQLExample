/**
 * Created by michal.svancar on 02.06.2017.
 */

import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import QueryResponse from "../models/QueryResponse";
import {
  authorsQuery, updateAuthorMutation, deleteAuthorMutation,
  authorPostsQuery, createAuthorMutation, authorQuery
} from "../models/QueriesAndMutations";

@Injectable()
export class AuthorsService {

  constructor(private apollo: Apollo) {
  }

  public getAuthors() {
    return this.apollo.watchQuery<QueryResponse>({
      query: authorsQuery,
      fetchPolicy: 'network-only'
    });
  }

  public getAuthor(id?: number) {
    return this.apollo.watchQuery<QueryResponse>({
      query: authorQuery,
      fetchPolicy: 'network-only',
      variables: {id},
    });
  }

  public createAuthor(firstName, lastName, email) {
    return this.apollo.mutate<QueryResponse>({
      mutation: createAuthorMutation,
      variables: {firstName, lastName, email},
    });
  }

  public updateAuthor(id, firstName, lastName, email) {
    return this.apollo.mutate<QueryResponse>({
      mutation: updateAuthorMutation,
      variables: {id, firstName, lastName, email},
    });
  }

  public deleteAuthor(id) {
    return this.apollo.mutate<QueryResponse>({
      mutation: deleteAuthorMutation,
      variables: {id},
      refetchQueries: [{query: authorsQuery}]
    })
  }

  public getAuthorPosts(id: number){
    return this.apollo.watchQuery<QueryResponse>({
      query: authorPostsQuery,
      variables: {id}
    });
  }






}

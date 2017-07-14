import {Post} from "./post.model";
/**
 * Created by michal.svancar on 05.05.2017.
 */

export interface Author {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  posts: Post[]
}

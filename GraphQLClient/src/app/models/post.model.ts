import {Author} from "./author.model";
/**
 * Created by michal.svancar on 05.05.2017.
 */

export interface Post {
  id: number,
  title: string,
  content: string,
  author: Author,
}

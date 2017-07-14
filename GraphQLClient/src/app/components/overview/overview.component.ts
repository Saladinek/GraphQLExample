/**
 * Created by michal.svancar on 05.05.2017.
 */

import {Component, OnInit, OnDestroy} from "@angular/core";
import {Author} from "../../models/author.model";
import {Router} from "@angular/router";
import {AuthorsService} from "../../services/authors.service";
import {Post} from "../../models/post.model";
import {ApolloQueryObservable} from "apollo-angular";
import 'rxjs/add/operator/map';
import {Subscription} from "apollo-client";


@Component({
  templateUrl: 'overview.component.html',
})

export class OverviewComponent implements OnInit, OnDestroy {
  loading: boolean;
  authors: Author[];
  posts: Post[];
  data: ApolloQueryObservable<any>;
  private subscription: Subscription;

  constructor(private router: Router, private authorsService: AuthorsService) {
  }

  private openEdit(id?: number) {
    if (id) {
      this.router.navigate(['edit', id]);
    } else {
      this.router.navigate(['new']);
    }
  }

  private getPosts(id: number) {
    this.authorsService.getAuthorPosts(id).subscribe((response) => {
      this.posts = response.data.author.posts;
      console.log(response.data.author.posts);
    });
  }

  private deleteAuthor(id: number) {
    this.authorsService.deleteAuthor(id).subscribe((response) => {
      this.loading = response.data.loading;
      console.log("DELETE");
      console.log(response.data);
    });
  }

  ngOnInit(): any {
    this.subscription = this.authorsService.getAuthors().subscribe((response) => {
      this.loading = response.data.loading;
      this.authors = response.data.authors;
      console.log("FETCH");
      console.log(response.data);
    });
  }

  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }

}

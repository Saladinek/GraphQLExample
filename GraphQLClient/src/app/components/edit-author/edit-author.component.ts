/**
 * Created by michal.svancar on 30.05.2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Author} from "../../models/author.model";
import {AuthorsService} from "../../services/authors.service";


@Component({
  templateUrl: 'edit-author.component.html'
})

export class EditAuthorComponent implements OnInit {

  private author: Author;
  private firstName: string = "";
  private lastName: string = "";
  private email: string = "";
  private loading: boolean;
  private id: number;
  private path: string;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private authorsService: AuthorsService) {
  }


  private submit() {
    if (this.path == 'new') {
      this.authorsService.createAuthor(this.firstName, this.lastName, this.email).subscribe(response => {
        console.log(response.data);
        console.log("CREATE");
        this.router.navigate(['/overview']);
      });
    } else {
      this.authorsService.updateAuthor(this.id, this.firstName, this.lastName, this.email)
        .subscribe(response => {
          this.loading = response.data.loading;
          console.log("UPDATE");
          this.router.navigate(['/overview']);
        });
    }
  }

  private returnToOverview() {
    this.router.navigate(['/overview']);
  }


  ngOnInit() {
    console.log("ngInit EditAuthorComponent");
    this.activeRoute.url.subscribe(url => {
      this.path = url[0].path;
      console.log(this.path);

      if (this.path == 'edit') {
        this.activeRoute.params.subscribe(params => {
          this.id = +params['id'];

          this.authorsService.getAuthor(this.id).subscribe(
            response => {
              this.author = response.data.author;
              this.firstName = this.author.firstName;
              this.lastName = this.author.lastName;
              this.email = this.author.email;
              console.log("GET SINGLE")
              console.log(response.data);

            }
          );
        });
      }
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService, DatabaseCollection, PagedCollection } from '../connect';
import { Observable, of, from } from 'rxjs';
import { tap, map, expand, takeWhile } from 'rxjs/operators';

import * as faker from 'faker';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  constructor(private database: DatabaseService) { }

  public collection = 'people';
  public count = 10;
  public mode: string;

  public page: PagedCollection<any>;
  public docs$: Observable<any>;
  public count$: Observable<number>;

  public display = true;

  ngOnInit() {

    this.page = this.database.pagedCollection(this.collection, { limit: 5 });
    this.count$ = this.page.stream().pipe( map( a => a.length) );
    this.docs$ = this.page.streamPage();
  }

  refresh() {
    this.display = false;
    setTimeout( () => { this.display = true; });
  }

  fillUp() {

    console.log('Adding ' + this.count +' documents in ', this.collection);

    this.page.reset();

    of(this.count)
      .pipe( 
        expand( count => this.add(count) ), 
        takeWhile( count => count > 0 ),
        tap(undefined, undefined, () => { 
          this.refresh();
        })
      ).subscribe();
  }

  private add(count: number): Promise<number> {

    if(count === 0) { return Promise.resolve(0); }

    const col = this.database.collection<any>(this.collection);
    const name = faker.name.firstName();
    const motto = faker.lorem.sentence();
    const country = faker.address.country();
    
    return col.add({ name, motto, country }).then( () => count-1 );
  }

  delete() {
    this.database.collection<any>(this.collection)
    .wipe().then( () => { 
      this.page.reset(); 
      this.refresh();
    });
  }

  more() {
     this.page.more();
  }

}
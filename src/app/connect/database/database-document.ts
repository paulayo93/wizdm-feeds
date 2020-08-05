import { DatabaseService, dbDocumentRef, dbTimestamp } from './database.service';
import { DatabaseCollection } from './database-collection';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface dbCommon {
  id?      : string,
  exists?  : boolean,
  created? : dbTimestamp,
  updated? : dbTimestamp
}

/**
 * Document object in the database, created by the DatabaseService
 */
export class DatabaseDocument<T extends dbCommon> {

  constructor(public db: DatabaseService, public path: string, public id: string) { }

  /**
   * Helper returing the document reference for internal use
   */
  public get doc(): dbDocumentRef<T> {
    return this.db.doc(`${this.path}/${this.id}`);
  }

  /**
   * Returns the parent collection
   */
  public get parent(): DatabaseCollection<T> {
    return this.db.collection<T>(this.path);
  }

  /**
   * Creates / destructively re-writes the document content.
   * Adds the 'created' timestamp
   */
  public set(data: T): Promise<void> {
    const timestamp = this.db.timestamp;
    return this.doc.set({
      ...data as any,
      created: timestamp
    } as T);
  }

  /**
   * Updates the document content by merging the new data with the existing one including sub objects.
   * Adds / updates the 'updated' timestamp
   */
  public merge(data: T): Promise<void> {
    const timestamp = this.db.timestamp;
    return this.doc.set({
      ...data as any,
      updated: timestamp
    } as T, { merge: true } );
  }

  /**
   * Updates the document content with the new data. Unlike merge, it overwrites sub objects.
   * Adds / updates the 'updated' timestamp
   */
  public update(data: T): Promise<void> {
    const timestamp = this.db.timestamp;
    return this.doc.update({
      ...data as any,
      updated: timestamp
    } as T);
  }

  /**
   * Check for document existance
   */
  public exists(): Promise<boolean> {
    return this.doc.ref.get(undefined)
      .then(snap => snap.exists);
  }

  /**
   * Updates an existing document or create a new one by using the relevant fuctions, so,
   * timestamps are created and updated accordingly.
   */
  public upsert(data: T): Promise<void> {
    return this.exists().then(exists => {
      return exists ? this.update(data) : this.set(data);
    })
  }

  /**
   * Returns the document content immediately
   */
  public get(): Observable<T> {
    return this.doc.get()
      .pipe( map( snapshot => {
        const data = snapshot.data();
        const id = snapshot.id;
        return ( (typeof data !== 'undefined') ? { ...data as any, id } : undefined );
      }));
  }

  /**
   * Streams the document content with an observable
   */
  public stream(): Observable<T> {
    return this.doc.snapshotChanges()
      .pipe( map( snapshot => {
        const data = snapshot.payload.data();
        const id = snapshot.payload.id;
        return ( (typeof data !== 'undefined') ? { ...data as any, id } : undefined );
      }));
  }

  /**
   * Deletes the document
   */
  public delete(): Promise<void> {
    return this.doc.delete();
  }
}
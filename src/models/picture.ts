export class Picture {
  id: number;
  externalIdentifier: string;
  url: string;

  constructor(externalIdentifier: string, url: string) {
    this.externalIdentifier = externalIdentifier;
    this.url = url;
  }
}

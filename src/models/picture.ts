export class Picture {
  id: number;
  externalIdentifier: string;
  url: string;
  hasRemoteUrl: boolean;

  constructor(externalIdentifier: string, url: string, hasRemoteUrl: boolean = false) {
    this.externalIdentifier = externalIdentifier;
    this.url = url;
    this.hasRemoteUrl = hasRemoteUrl
  }
}

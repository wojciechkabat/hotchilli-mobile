export class Constants {
  public static APP_VERSION = '1.0.0';
  public static API_ENDPOINT= 'http://192.168.1.172:8080';
  public static NUMBER_OF_PERSONS_IN_SINGLE_CALL= 20;
  public static NUMBER_OF_PEOPLE_TO_FETCH_FOR_GUESTS= 10;

  public static ERROR_CODES = {
    UNAUTHENTICATED: 403,
    GUEST_VOTE_LIMIT_EXCEEDED: 521,
  };
}

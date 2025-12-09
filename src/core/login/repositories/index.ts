export interface ILoginRepository<T> {
  //get(loginId: string): Promise<T>;
  create(data: T): Promise<T>;
}

import {Expose} from 'class-transformer';

export default class LoggedUserRDO {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;

  @Expose()
  public name!: string;
}

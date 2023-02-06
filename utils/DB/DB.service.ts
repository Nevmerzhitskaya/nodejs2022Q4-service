import { Injectable } from "@nestjs/common";
import DB from "./DB";

const db = new DB();

@Injectable()

export class DBService {

  getDB(): DB {
    return db;
  }
}
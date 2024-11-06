/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
// Set autoCommit to true
oracledb.autoCommit = true;

const dbConfig: oracledb.ConnectionAttributes = {
  user: 'SYS',
  password: '123',
  connectString: '192.168.100.148:1521/asmprod',
  privilege: oracledb.SYSDBA, // Additional privilege
};

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'ORACLE_CONNECTION',
      useFactory: async (): Promise<oracledb.Connection> => {
        return oracledb.getConnection(dbConfig);
      },
    },
  ],
})
export class AppModule {}

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Inject,
  Delete,
  Post,
  Body,
  Res,
  Param,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { Connection } from 'oracledb';
import { HttpException, HttpStatus } from '@nestjs/common';
import { oracledb, ConnectionAttributes } from 'oracledb';

@Controller('api')
export class AppController {
  constructor(
    @Inject('ORACLE_CONNECTION') private oracleConnection: Connection,
  ) {}

  @Get('getOracleTable')
  async getOracleTable() {
    try {
      await this.oracleConnection.ping();
      const query = 'SELECT * FROM ORACLEASM_TABLE';
      const result = await this.oracleConnection.execute(query);
      console.log('Retrieved data from ORACLEASM_TABLE');

      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error connecting to Oracle:', error);
      return [];
    }
  }
  @Get('getOracleTableById/:id')
  async getOracleTableById(@Param('id') id: number) {
    try {
      await this.oracleConnection.ping();
      const query = 'SELECT * FROM ORACLEASM_TABLE WHERE id = :id';
      const result = await this.oracleConnection.execute(query, [id]);
      console.log(`Retrieved data from ORACLEASM_TABLE for ID ${id}`);
  
      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error connecting to Oracle:', error);
      return [];
    }
  }

  
  // test add new ===============
  @Get('getData')
  async getData() {
    try {
      return 'hello';
    } catch (error) {
      console.error('Error connecting to Oracle:', error);
      return [];
    }
  }

  // test add new ===============

 

  @Post('insert_oracle_table')
  async insertOracleData(@Body() data: any) {
    let connection;
    try {
      if (Array.isArray(data)) {
        // Handle multi-record insert
        for (const record of data) {
          const query = `INSERT INTO ORACLEASM_TABLE (name) VALUES ('${record.name}')`;
          await this.oracleConnection.execute(query);
        }
        console.log('Data has been inserted into ORACLEASM_TABLE');
      } else {
        // Handle single-record insert
        const query = `INSERT INTO ORACLEASM_TABLE (name) VALUES ('${data.name}')`;
        await this.oracleConnection.execute(query);
        console.log('Data has been inserted into ORACLEASM_TABLE');
      }

      // Retrieve the updated data from the oracle_table
      const selectQuery = 'SELECT * FROM ORACLEASM_TABLE';
      const result = await this.oracleConnection.execute(selectQuery);

      console.log(result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error connecting to Oracle:', error);
      return { message: 'Error inserting data' };
    }
  }

  @Delete('delete_oracle_data/:id')
  async deleteOracleData(@Param('id') id: string) {
    console.log(id);
    let connection;
    try {
      const query = 'DELETE FROM ORACLEASM_TABLE WHERE ID = :id';
      await this.oracleConnection.execute(query, { id: id });

      console.log('Data has been deleted from ORACLEASM_TABLE');
      return { message: 'Data has been deleted' };
    } catch (error) {
      console.error('Error connecting to Oracle:', error);
      return { message: 'Error deleting data' };
    }
  }

  @Put('update_oracle_data/:id')
  async updateOracleData(@Param('id') id: string, @Body() data: any) {
    console.log(id);

    try {
      const query = 'UPDATE ORACLEASM_TABLE SET name = :data WHERE ID = :id';
      await this.oracleConnection.execute(query, { id: id, data: data.name });

      console.log('Data has been updated in ORACLEASM_TABLE');
      return { message: 'Data has been updated' };
    } catch (error) {
      console.error('Error connecting to Oracle:', error);
      return { message: 'Error updating data ORACLEASM_TABLE' };
    }
  }
}

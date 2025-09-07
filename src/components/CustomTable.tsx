import { Table } from "antd";
import type React from "react";

const CustomTable: React.FC<{
  columns: any[];
  data: any[];
  loading?: boolean;
}> = ({ columns, data, loading }) => (
  <Table loading={loading} columns={columns} dataSource={data} />
);

export default CustomTable;

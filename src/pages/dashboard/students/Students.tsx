import { useEffect, useState, type ChangeEvent } from "react";
import { CustomTable, PageCaption } from "../../../components";
import { Button, Input } from "antd";
import { debounce, instance } from "../../../hooks";
import { MoreOutlined } from "@ant-design/icons";
import type { StudentType } from "../../../@types/StudentType";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Search part start
  const [searchName, setSearchName] = useState<string | undefined>("");
  const name = debounce(searchName, 700);

  const column = [
    { title: "ID", dataIndex: "key" },
    { title: "O'quvchi IDsi", dataIndex: "studentId" },
    { title: "Ismi", dataIndex: "name" },
    { title: "Familiya", dataIndex: "surname" },
    { title: "Yo'nalish", dataIndex: "stackName" },
    { title: "Gurux holati", dataIndex: "statusName" },
    { title: "Batafsil", dataIndex: "action" },
  ];

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value);
    setLoading(true);
  }
  // Search part end

  // Students get all
  const [students, setStudents] = useState<StudentType[]>([]);
  useEffect(() => {
    instance()
      .get("/students", { params: { name: name } })
      .then((res) => {
        setStudents(
          res.data.data.map((item: StudentType, index: number) => {
            item.key = index + 1;
            item.stackName = item.group.name;
            item.statusName = item.group.status;
            item.action = (
              <Button
                onClick={() => navigate(`${item.id}`)}
                size="middle"
                icon={<MoreOutlined className="!text-[18px]" />}
                type="primary"
                className="!bg-[#bc8e5b] !p-0 translate-y-[2px]"
              ></Button>
            );
            return item;
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  return (
    <div className="p-5">
      <PageCaption title="O'quvchilar" count={students.length} />
      <div className="mt-5 flex items-center gap-5">
        <Input
          onChange={handleSearch}
          className="!w-[350px]"
          placeholder="Qidirish"
          size="large"
          allowClear
        />
      </div>
      <div className="mt-5">
        <CustomTable loading={loading} columns={column} data={students} />
      </div>
    </div>
  );
};

export default Students;

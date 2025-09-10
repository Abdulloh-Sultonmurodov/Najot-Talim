import { Button, Input } from "antd";
import { CustomTable, PageCaption } from "../../../components";
import { useEffect, useState, type ChangeEvent } from "react";
import { debounce, instance } from "../../../hooks";
import { MoreOutlined } from "@ant-design/icons";
import type { TeacherType } from "../../../@types/TeacherType";
import { useNavigate } from "react-router-dom";

const Teachers = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  // Search part start
  const [searchName, setSearchName] = useState<string | undefined>("");
  const name = debounce(searchName, 700);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value);
    setLoading(true);
  }
  // Search part end

  const column = [
    { title: "ID", dataIndex: "key" },
    { title: "Ismi", dataIndex: "name" },
    { title: "Familiya", dataIndex: "surname" },
    { title: "Yo'nalish", dataIndex: "stackName" },
    { title: "Lavozim", dataIndex: "statusName" },
    { title: "Batafsil", dataIndex: "action" },
  ];

  // Teachers get all
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  useEffect(() => {
    instance()
      .get("/teachers", { params: { name: name } })
      .then((res) => {
        setTeachers(
          res.data.data.map((item: TeacherType, index: number) => {
            item.key = index + 1;
            item.stackName = item.stack.name;
            item.statusName = item.status.name;
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
      <PageCaption title="Ustozlar" count={teachers.length} />
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
        <CustomTable loading={loading} columns={column} data={teachers} />
      </div>
    </div>
  );
};

export default Teachers;

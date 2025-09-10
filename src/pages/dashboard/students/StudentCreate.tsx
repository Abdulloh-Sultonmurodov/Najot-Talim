import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateCaption } from "../../../components";
import { Input, Select } from "antd";
import { toast } from "react-toastify";
import { instance } from "../../../hooks";
import type { RegionType } from "../../../@types/RegionType";

const StudentCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [groupId, setGroupId] = useState<string>("");
  const [regionId, setRegionId] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [study, setStudy] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();

  // Region get all start
  const [regions, setRegions] = useState<{ label: string; value: string }[]>(
    []
  );
  useEffect(() => {
    instance()
      .get("/regions")
      .then((res) => {
        setRegions(
          res.data.data.map((item: RegionType) => {
            item.label = item.name;
            item.value = item.id;
            return item;
          })
        );
      });
  }, []);
  // Region get all end

  function handleCreateStudent(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const data = {
      studentId: Number(studentId),
      name,
      surname,
      age: Number(age),
      groupId: Number(groupId),
      regionId: Number(regionId),
      district,
      study,
      phone,
      email,
    };
    if (id) {
      instance()
        .patch(`/students/${id}`, data)
        .then(() => {
          toast.success("Muvaffaqatli o'zgartirildi!", {
            onClose: () => {
              setLoading(false);
              navigate(-1);
            },
            autoClose: 1000,
          });
        });
    } else {
      instance()
        .post("/students", data)
        .then(() => {
          toast.success("Muvaffaqiyatli qo'shildi", {
            onClose: () => {
              setLoading(false);
              navigate(-1);
            },
            autoClose: 700,
          });
        });
    }
  }

  useEffect(() => {
    if (id) {
      instance()
        .get(`/students/${id}`)
        .then((res) => {
          setName(res.data.name);
          setSurname(res.data.surname);
          setAge(res.data.age);
          setRegionId(res.data.regionId);
          setDistrict(res.data.district);
          setStudy(res.data.study);
          setStudentId(res.data.studentId);
          setGroupId(res.data.groupId);
          setEmail(res.data.email);
          setPhone(res.data.phone);
        });
    }
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleCreateStudent} className="p-5">
      <CreateCaption isLoading={loading} title="O'quvchilar" />
      <div className="flex mt-5 justify-between">
        <div className="w-[45%] flex flex-col gap-5">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            allowClear
            placeholder="Ism kiriting"
            size="large"
          />
          <Input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            allowClear
            placeholder="Familiya kiriting"
            size="large"
          />
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            allowClear
            placeholder="Yosh kiriting"
            size="large"
          />
          <Select
            value={regionId}
            onChange={(e) => setRegionId(e)}
            className="!w-full"
            size="large"
            allowClear
            showSearch
            placeholder="Viloyat tanlang"
            optionFilterProp="label"
            options={regions}
          />
          <Input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            allowClear
            placeholder="Tuman kiriting"
            size="large"
          />
          <Input
            value={study}
            onChange={(e) => setStudy(e.target.value)}
            allowClear
            placeholder="O'qish joyingizni kiriting"
            size="large"
          />
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <Input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            allowClear
            placeholder="O'quvchi IDsi kiriting"
            size="large"
          />
          <Input
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            allowClear
            placeholder="Guruh IDsi kiriting"
            size="large"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            allowClear
            placeholder="Email kiriting"
            size="large"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            allowClear
            placeholder="Raqamingiz kiriting"
            size="large"
          />
        </div>
      </div>
    </form>
  );
};

export default StudentCreate;

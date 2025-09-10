import { Input, Select } from "antd";
import { CreateCaption } from "../../../components";
import { useEffect, useState, type FormEvent } from "react";
import { instance } from "../../../hooks";
import type { StackType } from "../../../@types/StackType";
import type { RegionType } from "../../../@types/RegionType";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const TeacherCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [stackId, setStackId] = useState<string>();
  const [regionId, setRegionId] = useState<string>();
  const [district, setDistrict] = useState<string>();
  const [statusId, setStatusId] = useState<string>();
  const [experience, setExperience] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [study, setStudy] = useState<string>();
  const [isMerried, setIsMerried] = useState<string>();
  const [workCompanyIds, setWorkCompanyIds] = useState<string>();

  // Stack get all start
  const [stacks, setStacks] = useState<{ label: string; value: string }[]>([]);
  useEffect(() => {
    instance()
      .get("/stacks")
      .then((res) => {
        setStacks(
          res.data.data.map((item: StackType) => {
            item.label = item.name;
            item.value = item.id;
            return item;
          })
        );
      });
  }, []);
  // Stack get all end

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

  // Work list get all start
  const [workList, setWorkList] = useState<{ label: string; value: string }[]>(
    []
  );
  useEffect(() => {
    instance()
      .get("/work-lists")
      .then((res) => {
        setWorkList(
          res.data.data.map((item: RegionType) => {
            item.label = item.name;
            item.value = item.id;
            return item;
          })
        );
      });
  }, []);
  // Work list get all end

  // Status get all start
  const [status, setStatus] = useState<{ label: string; value: string }[]>([]);
  useEffect(() => {
    instance()
      .get("/status")
      .then((res) => {
        setStatus(
          res.data.data.map((item: RegionType) => {
            item.label = item.name;
            item.value = item.id;
            return item;
          })
        );
      });
  }, []);
  // Status get all end

  function handleCreateTeacher(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const data = {
      name,
      surname,
      age: Number(age),
      stackId: Number(stackId),
      regionId: Number(regionId),
      district,
      statusId: Number(statusId),
      experience,
      gender,
      email,
      phone,
      isMerried,
      study,
      workCompanyIds: [Number(workCompanyIds)],
    };
    if (id) {
      instance()
        .patch(`/teachers/${id}`, data)
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
        .post("/teachers", data)
        .then(() => {
          toast.success("Muvaffaqiyatli qo'shildi", {
            onClose: () => {
              navigate(-1);
            },
            autoClose: 1000,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (id) {
      instance()
        .get(`/teachers/${id}`)
        .then((res) => {
          setName(res.data.name);
          setSurname(res.data.surname);
          setAge(res.data.age);
          setStackId(res.data.stackId);
          setRegionId(res.data.regionId);
          setDistrict(res.data.district);
          setStatusId(res.data.statusId);
          setExperience(res.data.experience);
          setGender(res.data.gender);
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setIsMerried(res.data.isMerried);
          setStudy(res.data.study);
          setWorkCompanyIds(res.data.workCompanyIds);
        });
    }
  }, []);

  return (
    <form autoComplete="off" onSubmit={handleCreateTeacher} className="p-5">
      <CreateCaption isLoading={loading} title="Ustoz" />
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
            value={stackId}
            onChange={(e) => setStackId(e)}
            className="!w-full"
            size="large"
            allowClear
            showSearch
            placeholder="Yo'nalish tanlang"
            optionFilterProp="label"
            options={stacks}
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
        </div>
        <div className="w-[45%] flex flex-col gap-5">
          <Select
            value={statusId}
            onChange={(e) => setStatusId(e)}
            className="!w-full"
            size="large"
            allowClear
            showSearch
            placeholder="Lavozim tanlang"
            optionFilterProp="label"
            options={status}
          />
          <Input
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            allowClear
            placeholder="Tajribasi"
            size="large"
          />
          <Select
            value={gender}
            onChange={(e) => setGender(e)}
            className="!w-full"
            size="large"
            allowClear
            showSearch
            placeholder="Gender kiriting"
            optionFilterProp="label"
            options={[
              { label: "Erkak", value: "Erkak" },
              { label: "Ayol", value: "Ayol" },
            ]}
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
          <Input
            value={study}
            onChange={(e) => setStudy(e.target.value)}
            allowClear
            placeholder="O'qish joyingizni kiriting"
            size="large"
          />
          <Select
            value={isMerried}
            onChange={(e) => setIsMerried(e)}
            className="!w-full"
            size="large"
            allowClear
            showSearch
            placeholder="Turmush qurganmisiz"
            optionFilterProp="label"
            options={[
              { label: "Ha", value: "Ha" },
              { label: "Yo'q", value: "Yo'q" },
            ]}
          />
          <Select
            value={workCompanyIds}
            onChange={(e) => setWorkCompanyIds(e)}
            className="!w-full"
            size="large"
            allowClear
            showSearch
            placeholder="Ish joyini kiriting"
            optionFilterProp="label"
            options={workList}
          />
        </div>
      </div>
    </form>
  );
};

export default TeacherCreate;

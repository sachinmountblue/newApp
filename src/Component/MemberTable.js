import react from "react";
import { Table, Space, Button } from "antd";

const MemberTable = ({ memberList, openModalHandler }) => {
  console.log("THIS IS MEMBER LIST", memberList);

  const dataSource = [...memberList];

  const columns = [
    {
      title: "USER NAME",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Action",
      key: "action",
      render: (item, record, Index) => (
        <>
          <Button
            type="primary"
            style={{ color: "#1890ff", border: "solid 0px" }}
            onClick={() => openModalHandler("EDIT", Index, record)}
          >
            <div>{Index}</div>
          </Button>
        </>
      ),
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
};

export default MemberTable;

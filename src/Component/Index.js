import react, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Button, Card } from "antd";
import MemberTable from "./MemberTable";
import InputForm from "./InputForm";

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [rowDetails, setRowDetails] = useState(null);
  const [memberList, setMemberList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const childRef = useRef(null);

  const onSubmit = (value) => {
    console.log("THIS IS SELECTED INDEX", selectedIndex);
    if (selectedIndex != null) {
      memberList.splice(selectedIndex, 1, value);
      setMemberList([...memberList]);
      setModalVisible(false);
      setModalComponent(null);
    } else {
      setMemberList([...memberList, value]);
      setModalVisible(false);
      setModalComponent(null);
    }
  };

  const openModalHandler = (value, Index, row) => [
    console.log("THIS IS VALUE", value),
    console.log("THIS IS ROW", row),
    setSelectedIndex(Index),
    setModalVisible(true),
    setModalComponent(value),
    row && setRowDetails(row),
  ];

  const modalRenderComponent = () => {
    switch (modalComponent) {
      case "ADD":
        return (
          <InputForm
            title="ADD MEMBER"
            visible={modalVisible}
            onSubmit={onSubmit}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
            }}
          ></InputForm>
        );

      case "EDIT":
        return (
          <InputForm
            title="EDIT MEMBER"
            visible={modalVisible}
            onSubmit={onSubmit}
            initialValues={{ ...rowDetails }}
            onCancel={() => {
              setModalVisible(false);
              setModalComponent(null);
              setSelectedIndex(null);
            }}
          ></InputForm>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Card title="Member Table">
        <Card type="inner" title="Member Table" style={{ marginBottom: 20 }}>
          <Button type="primary" onClick={() => openModalHandler("ADD")}>
            Add Member
          </Button>
          <MemberTable
            memberList={memberList}
            openModalHandler={openModalHandler}
          ></MemberTable>
        </Card>
      </Card>
      {modalRenderComponent()}
    </>
  );
};

export default Index;

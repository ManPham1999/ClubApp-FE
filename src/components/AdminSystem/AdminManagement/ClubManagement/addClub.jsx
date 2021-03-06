import React, { Component, useState, Fragment, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  InputNumber,
  Tooltip,
} from "antd";
import axios from "axios";
import FormB4 from "react-bootstrap/Form";
import "./clubManagement.css";
import cogoToast from "cogo-toast";
import { Spin } from "antd";
import { withRouter } from "react-router";
import { RollbackOutlined } from "@ant-design/icons";
import { Button as ButtonAnt } from "antd";
import { Link } from "react-router-dom";
import { FcPlus, FcUndo } from "react-icons/fc";
import { Container } from "react-bootstrap";

const { TextArea } = Input;

const AddClub = (props) => {
  const success = useSelector((state) => state.adminSystem.success);
  const errors = useSelector((state) => state.adminSystem.errors);
  const isFetching = useSelector((state) => state.adminSystem.isFetching);
  const dispatch = useDispatch();
  //add
  const [clubName, setClubName] = useState("");
  const [clubDesc, setClubDesc] = useState("");
  const [clubHistory, setClubHistory] = useState("");
  const [clubGroupType, setClubGroupType] = useState("");
  const [clubPhone, setClubPhone] = useState("");
  const [clubEmail, setClubEmail] = useState("");
  const [clubFace, setClubFace] = useState("");
  const [clubPurpose, setClubPurpose] = useState("");
  const [clubFunction, setClubFunction] = useState("");
  const [err, setErr] = useState("");
  const [clubStructureImage, setClubStructureImage] = useState({
    preview: "",
    raw: "",
  });
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [clubLogo, setClubLogo] = useState({ preview: "", raw: "" });
  const [isLoading, setIsloading] = useState(false);

  let formData = new FormData();
  formData.append("clubDesc", clubDesc);
  formData.append("clubHistory", clubHistory);
  formData.append("clubGroupType", clubGroupType);
  formData.append("clubPhone", clubPhone);
  formData.append("clubEmail", clubEmail);
  formData.append("clubFace", clubFace);
  formData.append("clubName", clubName);
  formData.append("clubFunction", clubFunction);
  formData.append("clubPurpose", clubPurpose);
  formData.append("imageClub", image.raw);
  formData.append("clubLogo", clubLogo.raw);
  formData.append("clubStructureImage", clubStructureImage.raw);

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const offSetLayout = {
    wrapperCol: { offset: 2, span: 20 },
  };

  function handleSelectChange(value) {
    setClubGroupType(value);
  }
  const handleChangeImg = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const handleChangeLogo = (e) => {
    console.log("e.target.files", e.target.files);
    if (e.target.files.length) {
      setClubLogo({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const handleChangeStructure = (e) => {
    if (e.target.files.length) {
      setClubStructureImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const validateMessages = {
    required: "${label} kh??ng ???????c ????? tr???ng!",
    types: {
      email: "${label} kh??ng ph???i email!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const handleSubmit = (formData) => {
    const Authorization = localStorage.getItem("Authorization");
    if (
      formData.get("clubDesc") &&
      formData.get("clubHistory") &&
      formData.get("clubGroupType") &&
      formData.get("clubPhone") &&
      formData.get("clubEmail") &&
      formData.get("clubFace") &&
      formData.get("clubName") &&
      formData.get("imageClub") &&
      formData.get("clubLogo") &&
      formData.get("clubStructureImage") &&
      formData.get("clubPurpose") &&
      formData.get("clubFunction")
    ) {
      setIsloading(true);
      axios({
        method: "post",
        url: "https://funnyclub-be.herokuapp.com/api/club/create/ImageClub",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `${Authorization}`,
        },
        data: formData,
      })
        .then((res) => {
          setIsloading(false);
          setClubName("");
          if (res.data) {
            cogoToast.success("T???o c??u l???c b??? th??nh c??ng");
            props.history.push("/adminSystem");
          }
        })
        .catch((err) => {
          cogoToast.error("L???i h??? th???ng...");
        });
    }
  };
  console.log(clubName);

  return (
    <div>
    <h2 className="title-dashboard">TH??M M???I C??U L???C B???</h2>
    <Fragment>
      <Spin tip="??ang t???o c??u l???c b???..." spinning={isLoading} size="large">
        <Form
          {...layout}
          className="form_add_club"
          validateMessages={validateMessages}
        >
          <Form.Item
            label="T??n c??u l???c b???"
            name="clubName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="Nh???p t??n c??u l???c b???"
              type="text"
              name="clubName"
            />
          </Form.Item>
          <Form.Item
            label="M?? t??? c??u l???c b???"
            name="clubDesc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={clubDesc}
              onChange={(e) => setClubDesc(e.target.value)}
              placeholder="Nh???p m?? t??? c??u l???c b???"
              type="text"
              name="clubDesc"
            />
          </Form.Item>
          <Form.Item
            label="M???c ????ch c??u l???c b???"
            name="clubPurpose"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              value={clubPurpose}
              onChange={(e) => setClubPurpose(e.target.value)}
              placeholder="Nh???p m???c ????ch c??u l???c b???"
              type="text"
              name="clubPurpose"
            />
          </Form.Item>
          <Form.Item
            label="Ch???c n??ng c??u l???c b???"
            name="clubFunction"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              value={clubFunction}
              onChange={(e) => setClubFunction(e.target.value)}
              placeholder="Nh???p ch???c n??ng c??u l???c b???"
              type="text"
              name="clubFunction"
            />
          </Form.Item>
          <Form.Item
            label="L???ch s??? c??u l???c b???"
            name="clubHistory"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea
              value={clubHistory}
              onChange={(e) => setClubHistory(e.target.value)}
              placeholder="Nh???p l???ch s??? c??u l???c b???"
              type="text"
              name="clubHistory"
            />
          </Form.Item>
          <Form.Item
            label="C??u l???c b??? c???p"
            name="clubGroupType"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              defaultValue="Ch???n c???p c???a c??u l???c b???"
              value={clubGroupType}
              onChange={handleSelectChange}
              name="clubGroupType"
            >
              <Select.Option value="khoa">Khoa</Select.Option>
              <Select.Option value="truong">Tr?????ng</Select.Option>
              <Select.Option value="doanhoi">??o??n H???i</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="input_Phone"
            label="S??? ??i???n tho???i c??u l???c b???"
            name="clubPhone"
            rules={[
              {
                required: true,
              },
            ]}
            min={10}
            max={10}
          >
            <Input
              value={clubPhone}
              onChange={(e) => setClubPhone(e.target.value)}
              placeholder="Nh???p s??? ??i???n tho???i c??u l???c b???"
              type="text"
              name="clubPhone"
            />
          </Form.Item>
          <Form.Item
            label="Email c??u l???c b???"
            name="clubEmail"
            rules={[
              {
                required: true,
              },
              {
                type: "email",
              },
            ]}
          >
            <Input
              value={clubEmail}
              onChange={(e) => setClubEmail(e.target.value)}
              placeholder="Nh???p email c??u l???c b??? c???p"
              type="text"
              name="clubEmail"
            />
          </Form.Item>
          <Form.Item
            label="Facebook c??u l???c b???"
            name="clubFace"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              value={clubFace}
              onChange={(e) => setClubFace(e.target.value)}
              placeholder="Nh???p link Facebook Club c??u l???c b??? c???p"
              type="text"
              name="clubFace"
            />
          </Form.Item>

          <Form.Item
            label="H??nh ???nh c??u l???c b???"
            name="imageClub"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <FormB4.File id="custom-file" onChange={handleChangeImg} />
          </Form.Item>

          <Form.Item
            label="Logo c??u l???c b???"
            name="clubLogo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <FormB4.File id="custom-file" onChange={handleChangeLogo} />
          </Form.Item>

          <Form.Item
            label="C?? c???u c??u l???c b???"
            name="clubStructureImage"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <FormB4.File id="custom-file" onChange={handleChangeStructure} />
          </Form.Item>
          <Form.Item {...offSetLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleSubmit(formData)}
              // className='btn_add_club'
            >
              <FcPlus size={20} /> &nbsp; T???o c??u l???c b???
            </Button>{" "}
            &nbsp;
            <Link to="/adminsystem">
              <ButtonAnt type="primary">
                <FcUndo size={20} /> &nbsp; Tr??? v???
              </ButtonAnt>
            </Link>
          </Form.Item>
        </Form>
      </Spin>
    </Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  // createClubAll: () => dispatch(createClub(clubName)),
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddClub)
);

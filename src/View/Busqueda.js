import React, { useState } from 'react';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { pass } from "../Redux/Actions/validate";
import { Fetch } from "../Utils/Fetch";
import { Upload, Row, Col, Typography, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Dragger } = Upload;
const { Title } = Typography;

function Busqueda() {
  const dispatch = useDispatch();
  const validate = useSelector(state => state.validate);
  const rename = (data) => dispatch(pass(data));
  const [list, setList] = useState({ file: null, ready: false })
  const allowedFiles = ["image/png", "image/jpeg"];

  const config = {
    name: 'file',
    multiple: false,
    onChange(info) {
      let { status } = info.file;

      if (list?.ready === true) {
        FetchSearch()
      }
      if (status === "error") {
        message.error(`[ADVERTENCIA] Solo se aceptan archivos png y jpg.`);
      }
    },
    beforeUpload: file => {
      if (allowedFiles.includes(file.type)) {
        setList({ file, ready: true })
        return false;
      }
    },

  };

  const FetchSearch = async () => {
    try {
      let formData = new FormData();
      formData.append("file", list?.file);
      let data = await Fetch("https://whois.nomada.cloud/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Nomada": `OTNjYjc3ZTEtYTI3MC00MTI0LTg4ZmQtMmU0NWU1MDZjNGZj`
        }
      });
      if (data?.error?.length > 0) {
        setList((prevState) => ({ ...prevState, ready: false }))
        Swal.fire(
          "Respuesta inesperada",
          `${data?.error}`,
          "info"
        );
      } else {
        rename({ ...validate, checking: true, name: data?.actorName })
      }
    } catch (e) {
      setList((prevState) => ({ ...prevState, ready: false }))
      Swal.fire(
        "Operación Fallida",
        `Error inesperado: ${e.message}`,
        "error"
      );
    }
  };
  return (
    <Row justify="center" align="middle" className="height-vh-100 bgGrey">
      <Col sx={24} md={12} className="bgWhite pd-50">
        <Row>
          <Col span={24}>
            <Title level={3} className="textAlign-c">¿Quién es este actor?</Title>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Dragger {...config} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Haz click o arrastra una imagen</p>
              <p className="ant-upload-hint">
                Selecciona la foto de un actor famoso para conocer quién es y en qué peliculas ha salido.
              </p>
            </Dragger>
          </Col>
        </Row>
      </Col>
    </Row>
  );

}

export default Busqueda;


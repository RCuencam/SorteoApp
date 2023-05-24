import React, { useContext, useEffect, useRef, useState } from "react";
import { Table, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
import { AppContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import * as XLSX from 'xlsx';
import FormatoPDF from '../assets/Formato.xlsx';
import uniqid from 'uniqid';

export const Participantes = () => {
  const { users, setUsers, tablas } = useContext(AppContext);
  const navigate = useNavigate();

  const [participant, setParticipant] = useState({
    id: users.length,
    name: "",
  });

  const [excelData, setExcelData] = useState(null);
  const [dataSource, setDataSource] = useState(users);
  const [excelName, setExcelName] = useState(null);


  const fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  const handleFile = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];
    if(selectedFile) {
      setExcelName(selectedFile.name)
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        e.preventDefault();
        let data = e.target.result
        setExcelData(data);
      }
    } else {
      setExcelData(null)
    }
  }

  const handleUploadExcel = (e) => {
    e.preventDefault();
    if(excelData !== null) {
      const workbook = XLSX.read(excelData, { type: 'buffer' });
      const workSheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data)
      let arr = data.map((item, index) => ({
        id: uniqid(),
        name: item.Participantes
      }))
      setDataSource([...users, ...arr]);
      setUsers([...users, ...arr])
      setExcelName("");
      setExcelData(null)
    } else {
      setExcelData(null)
    }
  }

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });


  const columns = [
    {
      title: "Nombres",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Eliminar",
      dataIndex: "",
      key: "",
      __ignore__: true,
      render: (item) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(item.id)}
        >
          Eliminar
        </button>
      ),
    },
  ];

  const handleExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs("Participantes.xlsx");
  };

  const handleChangeInput = (e) => {
    setParticipant({
      ...participant,
      name: e.target.value,
    });
  };
  const addParticipant = () => {
    if (participant.name.length > 0) {
      setUsers([...users, participant]);
      setDataSource([...users, participant]);

      setParticipant({
        ...participant,
        id: users.length + 1,
        name: "",
      });
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((item) => item.id !== id));
    setDataSource(users.filter((item) => item.id !== id));
  };

  const deleteAll = () => {
    setDataSource([]);
    setUsers([]);
  }

  return (
    <div className="participants">
      <div className="goBack" onClick={() => navigate("/sorteo")}>
        <img src={Logo} alt="" width={200}/>
      </div>
      <h1>Participantes</h1>
      <div className="participants_form">
        <input
          type="text"
          placeholder="Ingrese el nombre"
          onChange={(e) => handleChangeInput(e)}
          value={participant.name}
        />
        <button onClick={addParticipant}>Añadir</button>
      </div>
      <div className="participants_body">
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <button className="delete-button" onClick={deleteAll}>Borrar Todo</button>
        <a href={FormatoPDF} target="_blank" download="Formato Participantes.xlsx"><button className="format-button">Descargar Formato</button></a>
        </div>
        <div className="export_button">
        <div className="inputfile-box">
          <input type="file" id="file" className="inputfile" onChange={handleFile} />
          <label htmlFor="file">
            <span id="file-name" className="file-box">{excelName}</span>
            <span className="file-button">
              <i className="fa fa-upload" aria-hidden="true"></i>
              Seleccionar
            </span>
          </label>
        </div>
          <button onClick={handleUploadExcel} style={{marginRight: '10px', backgroundColor: 'orange'}}>Subir Archivo</button>
          <button onClick={handleExcel}>Descargar</button>
        </div>
        <div className="participants_table">
          <Table dataSource={dataSource} columns={columns}/>;
        </div>
      </div>
    </div>
  );
};

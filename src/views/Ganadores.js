import React, { useContext, useRef, useState } from "react";
import { Table, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { AppContext } from "../context/context";
import { Excel } from "antd-table-saveas-excel";
import { useNavigate } from "react-router-dom";

export const Ganadores = () => {
  const { tablas, setUsers, users, setTablas } = useContext(AppContext);
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState(
    tablas.find((item) => item.id === 4).winners
  );

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
  ];

  const handleExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(columns)
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs("Ganadores.xlsx");
  };

  const handleResetWinners = () => {
    setUsers([...users, ...dataSource]);
    setTablas(
      tablas.map((item) => (item.id === 4 ? { ...item, winners: [] } : item))
    );
    setDataSource([]);
  };

  return (
    <div className="participants">
      <div className="goBack" onClick={() => navigate("/sorteo")}></div>
      <h1>Ganadores</h1>
      <div className="participants_body">
        <div className="export_button">
          <button onClick={handleExcel}>Descargar</button>
        </div>
        <div className="participants_table">
          <Table dataSource={dataSource} columns={columns} id />;
          {dataSource.length > 0 && (
            <button
              style={{ width: "300px", marginTop: "20px" }}
              onClick={handleResetWinners}
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

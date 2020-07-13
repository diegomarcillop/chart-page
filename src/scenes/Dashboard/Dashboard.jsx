import React from "react";
import { useEffect } from "react";
import "./Dashboard.scss";
import apiCliente from "../../common/api/api-cliente";
import { Col, Card, Row, Select } from "antd";
import LineChart from "components/LineChart/LineChart";
import { useState } from "react";
import { GlobalOutlined } from "@ant-design/icons";
import DoughnutChart from "components/DoughnutChart/DoughnutChart";

export default function Home() {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);

  const { Option } = Select;

  useEffect(() => {
    async function getCountries() {
      const result = await apiCliente.get("countries");
      setCountries(result);
    }
    getCountries();
  }, []);

  async function getCasesCountry(country) {
    const result = await apiCliente.get(`dayone/country/${country}`);
    return result;
  }

  const onChange = async (value) => {
    const result = await getCasesCountry(value);
    setCountry(result.data);
  };

  return (
    <div className="home-page">
      <Row justify="center">
        <img src="/img/corona.svg" alt="img-corona" width="180px" />
      </Row>
      <Row justify="center">
        <h1 className="title">COVID-19</h1>
      </Row>

      <Col lg={{ span: 18, offset: 3 }} xs={{ span: 20, offset: 2 }}>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Porfavor, selecciona un pais!"
          optionFilterProp="children"
          size="large"
          suffixIcon={<GlobalOutlined size="" />}
          onChange={onChange}
        >
          {countries !== null
            ? countries.data.map((catetory, index) => {
                return (
                  <Option key={catetory.ISO2} value={catetory.Slug}>
                    {catetory.Country}
                  </Option>
                );
              })
            : " "}
        </Select>
        <Row>
          <Col lg={{ span: 10, offset: 1 }} xs={{ span: 20, offset: 2 }}>
            <Card hoverable className="card-chart">
              <LineChart country={country} />
            </Card>
          </Col>
          <Col lg={{ span: 10, offset: 1 }} xs={{ span: 20, offset: 2 }}>
            <Card hoverable className="card-chart">
              <DoughnutChart country={country} />
            </Card>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

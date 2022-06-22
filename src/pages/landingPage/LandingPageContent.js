import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setInlineRedux } from "../../redux/promodex/actions";
import { Card, Row, Col, Image } from "antd"



const LandingPageContent = (props) => {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(0)
  const apikey = "509e014f1333426989e7d88c82fabd0a"


  const handleSearch = () => {
    const searchQuery = "https://ipgeolocation.abstractapi.com/v1/?api_key=" + apikey;

    fetch(searchQuery)
      .then(response => response.json())
      .then(data => {
        setResult(data)
        setLoading(false)
      });
  }

  useEffect(() => {
    handleSearch()
  }, [])


  return (
    <Row>
      <Col sm={{ span: 6, offset: 9 }}>
        <Card
          title={<p className='textCenter'>Information</p>}
          hoverable
          loading={loading}
          cover={<Image preview={false} src={result?.flag?.svg}></Image>}
        >

          <p><b>IP Adress: </b>{result.ip_address}</p>
          <p><b>Continent: </b>{result.continent}</p>
          <p><b>Country: </b>{result.country + " (" + result.country_code + ")"}</p>
          <p><b>Region: </b>{result.region}</p>
          <p><b>Region ISO Code: </b>{result.region_iso_code}</p>
          <p><b>Currency: </b>{result?.currency?.currency_name + " (" + result?.currency?.currency_code + ")"}</p>
          <p><b>VPN: </b>{result.security?.is_vpn ? "Yes" : "No"}</p>
          <p><b>Connection: </b>{result?.connection?.isp_name}</p>
          <p><b>Timezone: </b>{result.timezone?.name + " (" + result?.timezone?.abbreviation + ")"}</p>
          <p><b>Emoji: </b>{result?.flag?.emoji}</p>

        </Card>
      </Col>
    </Row>
  );
}

const mapState = (globalState) => {
  return { inlineInformation: globalState.inlineInformation };
};
export default connect(mapState, { setInlineRedux })(withRouter(LandingPageContent));

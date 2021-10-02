import { Row, Col, Image, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';
import Notfound from "../Utils/notfound.png";
const { Text, Title } = Typography;

function CardMain({ original_title, vote_average, backdrop_path, overview, release_date, poster_path }) {
    return (
        <>
            <Col xs={24}>
                <Row>
                    <Col xs={24} md={12}>
                        <Title level={4} strong>{original_title || "No disponible"}</Title>
                    </Col>
                    <Col xs={24} md={12} className="textAlign-e">
                        <Title level={4} strong>
                            {vote_average}
                            <StarFilled className="clYellow mgl-5" />
                        </Title>
                    </Col>
                </Row>
            </Col>

            <Col xs={24}>
                <Row wrap={false}>
                    <Col flex="none" className="textAlign-c">
                        <Image
                            width={100}
                            src="error"
                            fallback={
                                backdrop_path === null && poster_path === null
                                    ? Notfound
                                    : `https://image.tmdb.org/t/p/w500/${backdrop_path || poster_path}`
                            }
                        />
                    </Col>
                    <Col flex="auto" className="pdl-10 pdr-10">
                        <p> {overview || "No disponible"} </p>
                        <Text strong className="clGrey">Fecha de estreno: {release_date || "No disponible"}</Text>
                    </Col>
                </Row>
            </Col>
        </>

    )
}

export default CardMain;
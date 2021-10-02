import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { pass, initial } from "../Redux/Actions/validate";
import Swal from "sweetalert2";
import { Fetch } from "../Utils/Fetch";
import { Card, Row, Col, Button, Image, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CardMain from "../Components/CardMain";
import Notfound from "../Utils/notfound.png";
const { Text, Title } = Typography;

function Resultado(props) {

    const { key, page, checking, name, actorPhoto, gender, popularity, movies } = useSelector(state => state.validate);
    const dispatch = useDispatch();
    const back = () => dispatch(initial());
    const { history } = props;
    const onClickBack = () => {
        back();
        history.push(`/`);
    }

    useEffect(() => {
        const FetchSearchMovies = async () => {
            try {
                const rename = (data) => dispatch(pass(data));
                let data = await Fetch(`https://api.themoviedb.org/3/search/person?api_key=${key}&language=es&query=${name}&page=${page}&include_adult=${false}`, {
                    method: "GET",
                });

                if (data?.error?.length > 0) {
                    Swal.fire(
                        "Respuesta inesperada",
                        `Artista no encontrado`,
                        "info"
                    )
                } else {
                    if (data?.results?.length > 0) {
                        let arr = []
                        data?.results?.forEach(element =>
                            element?.known_for?.forEach(movie => {
                                if (movie?.media_type === "movie") {
                                    arr.push(movie)
                                }
                            })
                        );
                        rename({
                            name,
                            key,
                            checking: true,
                            gender: (data?.results?.[0]?.gender === 1 ? "MUJER" : "HOMBRE"),
                            popularity: data?.results?.[0]?.popularity,
                            actorPhoto: (data?.results?.[0]?.profile_path !== null) ? `https://image.tmdb.org/t/p/w500/${data?.results?.[0]?.profile_path}` : null,
                            page: data?.page,
                            movies: arr,
                        })
                    }
                }

            } catch (e) {
                Swal.fire(
                    "Operación Fallida",
                    `Error inesperado: ${e?.message}`,
                    "error"
                );
            }
        };
        if (checking === true) {
            FetchSearchMovies();
        }
    }, [dispatch, key, name, page, checking]);

    return (
        <Row justify="center" align="middle" className="height-100 bgGrey scroll" >
            <Col sx={24} md={20} className="bgWhite">
                <div className="site-card-border-less-wrapper">
                    <Card bordered title={<Button type="primary" onClick={onClickBack} icon={<ArrowLeftOutlined />}>Regresar</Button>}
                        className="wd-100 pd-0" bodyStyle={{ padding: "0" }}>
                        <Row>
                            <Col xs={24} md={8} className="borderR-2 textAlign-c">
                                <Row>
                                    <Col xs={24} className="mt-20">
                                        <Image
                                            width={200}
                                            src="error"
                                            fallback={actorPhoto || Notfound}
                                        />
                                    </Col>
                                    <Col xs={24} className="textAlign-c">
                                        <Title className="mg-0" level={4} strong>{name}</Title>
                                    </Col>
                                    <Col xs={24} className="textAlign-c">
                                        <Text mark>{gender}</Text>
                                    </Col>
                                    <Col xs={24} className="textAlign-c">
                                        <Text>{popularity!==null ? `Popularidad: ${popularity}`: ""}</Text>
                                    </Col>
                                </Row>

                            </Col>
                            <Col xs={24} md={16} className="pd-10">
                                <Row>
                                    <Col xs={24} className="textAlign-j borderB-2">
                                        <Title className="mg-0" level={2} strong>Películas:</Title>
                                    </Col>
                                    {
                                        movies.map((data, index) => {
                                            return (
                                                <CardMain key={index} {...data} />
                                            )
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Col>
        </Row>
    );
}
export default withRouter(Resultado);
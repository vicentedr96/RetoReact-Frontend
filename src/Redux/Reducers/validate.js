import {
    PASS,
    INITIAL
} from "../Types";

const initialState = {
    checking: false,
    actorPhoto: null,
    gender: null,
    name: null,
    popularity: null,
    key: "30db1237b9167f8afaf9e065b90d16b8",
    page: "1",
    movies: [
        {
            name: null,
            backdrop_path: null,
            overview: null,
            first_air_date: null,
            vote_average: null
        }
    ]
}

export const validateReducer = (state = initialState, action) => {
    switch (action.type) {
        case PASS:
            return {
                key: "30db1237b9167f8afaf9e065b90d16b8",
                page: "1",
                checking: action.payload.checking,
                actorPhoto: action.payload.actorPhoto,
                gender: action.payload.gender,
                name: action.payload.name,
                popularity: action.payload.popularity,
                movies: action.payload.movies
            }
        case INITIAL:
            return {
                key: "991598d2fabd89e8b2c6c285a8abfa5d",
                page: "1",
                checking: false,
                actorPhoto: null,
                gender: null,
                name: null,
                popularity: null,
                movies: [
                    {
                        name: null,
                        backdrop_path: null,
                        overview: null,
                        first_air_date: null,
                        vote_average: null
                    }
                ]
            }
        default:
            return state;
    }
}


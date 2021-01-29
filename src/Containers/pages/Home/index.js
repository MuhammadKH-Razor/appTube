import React from 'react';
import '../../assets/style/Home.css';
import Youtube from '../../API/youtube';
import Pixabay from '../../API/pixabay';
import Axios from 'axios';
import { Spinner } from 'reactstrap';

class Home extends React.Component {

    state = {
        search: 'google company',
        search2: 'image',
        search3: 'transformers',
        search4: 'covid',
        videosAll: [],
        images: [],
        movies: [],
        news: [],
        videosSelected: null,
        videoId: '',
        detect: true,
        detect2: true,
        detect3: true,
        detect4: true,
        show: 'videos',
        typeImage: 'photo',
        typeMovie: 'movie',
        typeNews: 'everything',
        categoryNews: '',
        amount: 30,
        amountMovie: 9,
        categoryImage: 'backgrounds',
        baseURL: 'https://pixabay.com/api',
        key: '19510135-51a7f7ce651ddb970aa445aaf',
        baseURLMovie: 'http://www.omdbapi.com',
        keyMovie: '9d73e33b',
        baseURLNews: 'https://newsapi.org/v2',
        keyNews: 'a34423cbcdf54f0098795af1fd3bd8f9',
        // key: '16423592-44ab27175f36adf05c96aa104',
    }

    componentDidMount = async () => {
        const { show } = this.state;

        // uNTUK youtube api
        const response = await Youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: this.state.amount,
                key: 'AIzaSyAzgGM0BwAYKaFYiGWtO6LRdYeFl55DT18',
                q: this.state.search
            }

        })

        this.setState({
            videosAll: response.data.items,
            videosSelected: response.data.items[0],
            videoId: response.data.items[0].id.videoId,
            detect: true
        })

        // Untuk PIXABAY API
        const response2 = await Axios.get(`${this.state.baseURL}/?apikey=${this.state.key}&s=${this.state.search2}&type=${this.state.typeImage}&page=${this.state.amount}`)

        this.setState({
            images: response2.data.hits,
            detect2: true
        })

        console.log('images', this.state.images)

        // untuk MOVIE API
        const response3 = await Axios.get(`${this.state.baseURLMovie}/?apikey=${this.state.keyMovie}&t=${this.state.search3}&type=${this.state.typeMovie}&page=${this.state.amountMovie}`)

        this.setState({
            movies: response3.data.Search,
            detect3: true
        })

        console.log('movies', this.state.movies)
    }

    handleChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        const response2 = await Axios.get(`${this.state.baseURL}/?key=${this.state.key}&q=${this.state.search2}&image_type=${this.state.typeImage}&per_page=${this.state.amount}&safesearch=true`)

        this.setState({
            images: response2.data.hits,
            detect2: true
        })

        // const response3 = await Axios.get(`${this.state.baseURLMovie}/?s=${this.state.search3}&apikey=${this.state.keyMovie}&type=${this.state.typeMovie}`)

        // this.setState({
        //     movies: response3.data.Search,
        //     detect3: true
        // })

    }

    videoApp = (e) => {
        e.preventDefault();
        this.setState({
            show: 'videos'
        })
    }

    filmApp = (e) => {
        e.preventDefault();
        this.setState({
            show: 'film'
        })
    }

    imagesApp = (e) => {
        e.preventDefault();
        this.setState({
            show: 'images'
        })
    }

    newsApp = (e) => {
        e.preventDefault();
        this.setState({
            show: 'news'
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { show, amount } = this.state;

        const response = await Youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: amount,
                key: 'AIzaSyAzgGM0BwAYKaFYiGWtO6LRdYeFl55DT18',
                q: this.state.search,
            }
        })

        this.setState({
            videosAll: response.data.items,
            videosSelected: response.data.items[0],
            videoId: response.data.items[0].id.videoId,
            detect: true
        })

    }

    handleSubmitImages = async (e) => {
        e.preventDefault();

        const response2 = await Axios.get(`${this.state.baseURL}/?key=${this.state.key}&q=${this.state.search2}&image_type=${this.state.typeImage}&per_page=${this.state.amount}&safesearch=true`)

        this.setState({
            images: response2.data.hits,
            detect2: true
        })

        console.log('images2 :', this.state.images)
    }

    handleSubmitFilm = async (e) => {
        e.preventDefault();

        const response3 = await Axios.get(`${this.state.baseURLMovie}/?s=${this.state.search3}&apikey=${this.state.keyMovie}&type=${this.state.typeMovie}`)

        this.setState({
            movies: response3.data.Search,
            detect3: true
        })

        console.log('movies', this.state.movies)
    }

    handleSubmitNews = async (e) => {
        e.preventDefault();
        const { typeNews } = this.state;

        if (typeNews === 'everything') {
            const response4 = await Axios.get(`https://newsapi.org/v2/everything?q=${this.state.search4}&apiKey=a34423cbcdf54f0098795af1fd3bd8f9`)

            this.setState({
                news: response4.data.articles,
                detect4: true
            })

            console.log('news-top-everythink', this.state.news)

        } else if (typeNews === 'top-headlines') {
            const response4 = await Axios.get(`https://newsapi.org/v2/top-headlines?sources=${this.state.search4}&apiKey=a34423cbcdf54f0098795af1fd3bd8f9`)

            this.setState({
                news: response4.data,
                detect4: true
            })
        }

        console.log('news-top-headlines', this.state.news)
    }

    render() {
        const { handleChange, handleSubmit, handleSubmitImages, handleSubmitFilm, handleSubmitNews, videoApp, filmApp, imagesApp, newsApp } = this;
        const { search, search2, search3, search4, videosAll, videosSelected, videoId, categoryImage, categoryNews, detect, detect2, detect3, detect4, show, typeImage, typeMovie, typeNews, amount, amountMovie, images, movies, news } = this.state;
        const videoURL = `https://www.youtube.com/embed/${videoId}`;
        const videoURL2 = `https://www.youtube.com/embed`;

        if (show === 'videos') {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <form className="d-flex ml-auto">
                                    <div className="mb-0">
                                        <select id="disabledSelect" name="amount" value={amount} onChange={handleChange} className="form-select">
                                            <option value={30}>30</option>
                                            <option value={50}>50</option>
                                            <option value={80}>50</option>
                                            <option value={100}>100</option>
                                            <option value={150}>150</option>
                                        </select>
                                    </div>
                                    <input className="form-control me-2" type="search" name="search" placeholder={search} aria-label="Search" onChange={handleChange} />
                                    <button className="btn btn bt-ok" type="submit" onClick={handleSubmit}>Search</button>
                                </form>
                            </div>
                        </div>
                    </nav>

                    <section className="sec-1">

                        <div className="navbar-left">
                            <div className="title-menu">
                                <i className="las la-play"></i><h3>Apptube</h3>
                            </div>
                            <div className="list-menu">
                                <div onClick={videoApp}><i className="las la-video"></i> Videos</div>
                                <div onClick={filmApp}><i className="las la-film"></i> Film</div>
                                <div onClick={imagesApp}><i className="las la-camera"></i> Images</div>
                                <div onClick={newsApp}><i className="las la-newspaper"></i> E - News</div>
                            </div>
                        </div>

                        <div className="list-videosAll">
                            {
                                detect === true && this.state.videosAll.length ? (
                                    <div>
                                        <div className="videoPertama">
                                            <div className="videoPertama-video">
                                                <div className="frame">
                                                    <iframe src={videoURL} frameBorder="0" width="100%" height="100%"></iframe>
                                                </div>
                                            </div>
                                            <div className="deskripsi">
                                                <img src={videosSelected.snippet.thumbnails.default.url} alt="logo-channel" className="img-channel" />
                                                <br />
                                                <h4>{videosSelected.snippet.title}</h4>
                                                <p>{videosSelected.snippet.description}</p>
                                                <small>Channel : {videosSelected.snippet.channelTitle}</small>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                    <div className="spinners">
                                        <Spinner />
                                        <p>Menunggu hasil video</p>
                                    </div>
                            }

                            <div className="videoKedua">
                                {
                                    detect === true ? (
                                        videosAll.map((data, index) => {
                                            return (
                                                <div className="card-small" key={index}>
                                                    <div className="frame2">
                                                        <iframe src={`${videoURL2}/${data.id.videoId}`} frameBorder="0" width="100%" height="100%"></iframe>
                                                    </div>
                                                    <div className="small2">
                                                        <small>{data.snippet.title}</small>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) :
                                        null
                                }
                            </div>
                        </div>

                    </section>

                </div>
            )

            // PIXABAY API

        } else if (show === 'images') {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <form className="d-flex ml-auto">
                                    <div className="mb-0">
                                        <select id="disabledSelect" name="amount" value={amount} onChange={handleChange} className="form-select">
                                            <option value={30}>Amount</option>
                                            <option value={10}>10</option>
                                            <option value={30}>30</option>
                                            <option value={50}>50</option>
                                            <option value={80}>80</option>
                                            <option value={120}>120</option>
                                        </select>
                                    </div>
                                    <div className="mb-0">
                                        <select id="disabledSelect" name="typeImage" value={typeImage} onChange={handleChange} className="form-select">
                                            <option value="">Type</option>
                                            <option value="All">All</option>
                                            <option value="vector">Vector</option>
                                            <option value="photo">Photo</option>
                                            <option value="illustration">Illustration</option>
                                        </select>
                                    </div>
                                    <div className="mb-0">
                                        <select id="disabledSelect" name="categoryImage" value={categoryImage} onChange={handleChange} className="form-select">
                                            <option value="">category</option>
                                            <option value="backgrounds">backgrounds</option>
                                            <option value="fashion">fashion</option>
                                            <option value="nature">nature</option>
                                            <option value="science">science</option>
                                            <option value="education">education</option>
                                            <option value="feelings">feelings</option>
                                            <option value="health">health</option>
                                            <option value="people">people</option>
                                            <option value="religion">religion</option>
                                            <option value="places">places</option>
                                            <option value="animals">animals</option>
                                            <option value="industry">industry</option>
                                            <option value="computer">computer</option>
                                            <option value="food">food</option>
                                            <option value="sports">sports</option>
                                            <option value="transportation">transportation</option>
                                            <option value="travel">travel</option>
                                            <option value="buildings">buildings</option>
                                            <option value="business">business</option>
                                            <option value="music">music</option>
                                        </select>
                                    </div>
                                    <input className="form-control" type="search" name="search2" value={search2} placeholder={search2} aria-label="Search" onChange={handleChange} />
                                    <button className="btn btn bt-ok" type="submit" onClick={handleSubmitImages}>Search</button>
                                </form>
                            </div>
                        </div>
                    </nav>

                    <section className="sec-1">

                        <div className="navbar-left">
                            <div className="title-menu">
                                <i className="las la-play"></i><h3>Apptube</h3>
                            </div>
                            <div className="list-menu">
                                <div onClick={videoApp}><i className="las la-video"></i> Videos</div>
                                <div onClick={filmApp}><i className="las la-film"></i> Film</div>
                                <div onClick={imagesApp}><i className="las la-camera"></i> Images</div>
                                <div onClick={newsApp}><i className="las la-newspaper"></i> E - News</div>
                            </div>
                        </div>

                        <div className="list-videosAll">
                            <h3>Penelusuran : {this.state.search2} - ({images.length} gambar)</h3>
                            <div className="videoKedua">
                                {
                                    detect2 === true && this.state.images.length ? (
                                        this.state.images.map((data, index) => {
                                            return (
                                                <div className="card-small2" key={index}>
                                                    <div className="frame2">
                                                        <a href={data.largeImageURL} target="_blank"><img src={data.largeImageURL} alt="" /></a>
                                                        <div className="list-res">
                                                            <div className="dataUser">
                                                                <span>{data.user}</span>
                                                            </div>
                                                            <div className="dataSosmed">
                                                                <span><i className="las la-thumbs-up"></i>{data.likes}</span>
                                                                <span className="sp2"><i className="las la-star"></i>{data.favorites}</span>
                                                                <span className="sp2"><i className="las la-comment-dots"></i>{data.comments}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) :
                                        null
                                }
                            </div>
                        </div>

                    </section>
                </div>
            )
        } else if (show === 'film') {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <form className="d-flex ml-auto">
                                    <div className="mb-0">
                                        <select id="disabledSelect" name="typeMovie" value={typeMovie} onChange={handleChange} className="form-select">
                                            <option value="">Type</option>
                                            <option value="movie">movie</option>
                                            <option value="series">series</option>
                                            <option value="episode">episode</option>
                                        </select>
                                    </div>
                                    <input className="form-control" type="search" name="search3" value={search3} placeholder={search3} aria-label="Search" onChange={handleChange} />
                                    <button className="btn btn bt-ok" type="submit" onClick={handleSubmitFilm}>Search</button>
                                </form>
                            </div>
                        </div>
                    </nav>

                    <section className="sec-1">

                        <div className="navbar-left">
                            <div className="title-menu">
                                <i className="las la-play"></i><h3>Apptube</h3>
                            </div>
                            <div className="list-menu">
                                <div onClick={videoApp}><i className="las la-video"></i> Videos</div>
                                <div onClick={filmApp}><i className="las la-film"></i> Film</div>
                                <div onClick={imagesApp}><i className="las la-camera"></i> Images</div>
                                <div onClick={newsApp}><i className="las la-newspaper"></i> E - News</div>
                            </div>
                        </div>

                        <div className="list-videosAll">
                            <h3>Penelusuran : {this.state.search3}</h3>
                            <div className="videoKedua">
                                {
                                    detect3 === true ? (
                                        this.state.movies.map((data, index) => {
                                            return (
                                                <div className="card-small3" key={index}>
                                                    <div className="frame3">
                                                        <a href={data.Poster} target="_blank"><img src={data.Poster} alt="" /></a>
                                                        <div className="list-res">
                                                            <div className="dataUser">
                                                                <span>{data.Title}</span>
                                                            </div>
                                                            <div className="dataSosmed">
                                                                <span><i className="las la-calendar-alt"></i>{data.Year}</span>
                                                                <span className="sp2"><i className="las la-star"></i>{data.Type}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) :
                                        <div className="spinners">
                                            <Spinner />
                                            <p>Film tidak tersedia</p>
                                        </div>
                                }
                            </div>
                        </div>

                    </section>
                </div>
            )
        }else if (show === 'news') {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <form className="d-flex ml-auto">
                                    <div className="mb-0">
                                        <select id="disabledSelect" name="typeNews" value={typeNews} onChange={handleChange} className="form-select">
                                            <option value="everything">everything</option>
                                            <option value="top-headlines">top-headlines</option>
                                        </select>
                                    </div>
                                    <input className="form-control" type="search" name="search4" value={search4} placeholder={search4} aria-label="Search" onChange={handleChange} />
                                    <button className="btn btn bt-ok" type="submit" onClick={handleSubmitNews}>Search</button>
                                </form>
                            </div>
                        </div>
                    </nav>

                    <section className="sec-1">

                        <div className="navbar-left">
                            <div className="title-menu">
                                <i className="las la-play"></i><h3>Apptube</h3>
                            </div>
                            <div className="list-menu">
                                <div onClick={videoApp}><i className="las la-video"></i> Videos</div>
                                <div onClick={filmApp}><i clasName="las la-film"></i> Film</div>
                                <div onClick={imagesApp}><i className="las la-camera"></i> Images</div>
                                <div onClick={newsApp}><i className="las la-newspaper"></i> E - News</div>
                            </div>
                        </div>

                        <div className="list-videosAll">
                            <h3>Penelusuran : {this.state.search4}</h3>
                            <div className="videoKedua">
                                {
                                    detect4 === true ? (
                                        this.state.news.map((data, index) => {
                                            return (
                                                <div className="card-small4" key={index}>
                                                    <div className="frame4">
                                                        <div className="list-res">
                                                            <div className="dataSosmed d-block">
                                                                <a href={data.urlToImage} target="_blank"><img src={data.urlToImage} alt="" /></a>
                                                                <br />
                                                                <br />
                                                                <span><i className="las la-pen"></i>{data.author}</span>
                                                            </div>
                                                            <div className="dataUser">
                                                                <span>{data.content}</span>
                                                                <br />
                                                                <br />
                                                                <small><i className="las la-calendar-alt"></i>{data.publishedAt}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) :
                                        <div className="spinners">
                                            <Spinner />
                                            <p>Film tidak tersedia</p>
                                        </div>
                                }
                            </div>
                        </div>

                    </section>
                </div>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="d-flex ml-auto">
                                <div className="mb-0">
                                    <select id="disabledSelect" name="amount" value={amount} onChange={handleChange} className="form-select">
                                        <option value={10}>Amount</option>
                                        <option value={10}>10</option>
                                        <option value={30}>30</option>
                                        <option value={50}>50</option>
                                        <option value={80}>80</option>
                                        <option value={120}>120</option>
                                    </select>
                                </div>
                                <div className="mb-0">
                                    <select id="disabledSelect" name="typeImage" value={typeImage} onChange={handleChange} className="form-select">
                                        <option value="">Type</option>
                                        <option value="All">All</option>
                                        <option value="vector">Vector</option>
                                        <option value="photo">Photo</option>
                                        <option value="illustration">Illustration</option>
                                    </select>
                                </div>
                                <div className="mb-0">
                                    <select id="disabledSelect" name="categoryImage" value={categoryImage} onChange={handleChange} className="form-select">
                                        <option value="">category</option>
                                        <option value="backgrounds">backgrounds</option>
                                        <option value="fashion">fashion</option>
                                        <option value="nature">nature</option>
                                        <option value="science">science</option>
                                        <option value="education">education</option>
                                        <option value="feelings">feelings</option>
                                        <option value="health">health</option>
                                        <option value="people">people</option>
                                        <option value="religion">religion</option>
                                        <option value="places">places</option>
                                        <option value="animals">animals</option>
                                        <option value="industry">industry</option>
                                        <option value="computer">computer</option>
                                        <option value="food">food</option>
                                        <option value="sports">sports</option>
                                        <option value="transportation">transportation</option>
                                        <option value="travel">travel</option>
                                        <option value="buildings">buildings</option>
                                        <option value="business">business</option>
                                        <option value="music">music</option>
                                    </select>
                                </div>
                                <input className="form-control" type="search" name="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                                <button className="btn btn bt-ok" type="submit" onClick={handleSubmit}>Search</button>
                            </form>
                        </div>
                    </div>
                </nav>

                <section className="sec-1">

                    <div className="navbar-left">
                        <div className="title-menu">
                            <i className="las la-play"></i><h3>Apptube</h3>
                        </div>
                        <div className="list-menu">
                            <div onClick={videoApp}><i className="las la-video"></i> Videos</div>
                            <div onClick={filmApp}><i clasName="las la-film"></i> Film</div>
                            <div onClick={imagesApp}><i className="las la-camera"></i> Images</div>
                            <div onClick={newsApp}><i className="las la-newspaper"></i> E - News</div>
                        </div>
                    </div>

                    <div className="list-videosAll">
                    <h3>Penelusuran : {this.state.search4}</h3>
                            {
                                detect === true ? (
                                    <div>
                                        <div className="videoPertama">
                                            <div className="videoPertama-video">
                                                <div className="frame">
                                                    {/* <iframe src={videoURL} frameBorder="0" width="100%" height="100%"></iframe> */}
                                                </div>
                                            </div>
                                            <div className="deskripsi">
                                                {/* <img src={videosSelected.snippet.thumbnails.default.url} alt="logo-channel" className="img-channel" />
                                                <br />
                                                <h4>{videosSelected.snippet.title}</h4>
                                                <p>{videosSelected.snippet.description}</p>
                                                <small>Channel : {videosSelected.snippet.channelTitle}</small> */}
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                    <div className="spinners">
                                        <Spinner />
                                        <p>Menunggu hasil video</p>
                                    </div>
                            }
                        </div>

                </section>
            </div>
        )
    }
}

export default Home;
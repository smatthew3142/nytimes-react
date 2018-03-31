import React, { Component } from "react";
import { Col, Row, Container } from "react-materialize";
import API from "../../utils/API";
import { Article } from "../../components/Article";
import { Jumbotron } from "../../components/Jumbotron";
import { Form, Input, FormBtn, FormGroup, Label } from "../../components/Form";
import { CardPanel } from "react-materialize";


export default class Articles extends Component {
 
  state = {
    searchTerm: '',
    startYear: '',
    endYear: '',
    page:'0',
    results: [],
    previousSearch: {},
    noneFound: false,
    savedArticles: []
  };


  componentWillMount() {
    this.loadArticles();
  };

  loadArticles = () => {
    API.getArticles()
    .then(results => {
      this.setState({savedArticles: results.data})
    })
  };

  deleteArticle = id => {
    API.deleteArticle(id)
    .then(results => {
      let savedArticles = this.state.savedArticles.filter(article => article._id !== id)
      this.setState({ savedArticles: savedArticles})
      this.loadArticles();    
    })
    .catch(err => console.log(err));
  };

  saveArticle = (article) =>{

    let newArticle = {
      title: article.headline.main,
      url: article.web_url,
      synopsis: article.snippet,
      date: article.pub_date
    }

    API.saveArticle(newArticle)
    .then(results => {
      let unsaved = this.state.results.filter(article => article.headline.main !== newArticle.title)
      this.setState({results: unsaved})
      })
    .catch(err =>
      console.log(err));
  }


  getArticles = query => {
    if (query.searchTerm !== this.state.previousSearch.searchTerm ||
        query.startYear !== this.state.previousSearch.startYear ||
        query.endYear !== this.state.previousSearch.endYear) {
        this.setState({results: []})
      }
    let { searchTerm, startYear, endYear } = query

    let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${this.state.page}`
    let key = `&api-key=3b70e90628204f4b8d2844c3a0b644c7`

    if (searchTerm.indexOf(' ') >= 0) {

      searchTerm = searchTerm.replace(/\s/g, '+');
    }

    if (searchTerm) {
      queryUrl += `&fq=${searchTerm}`
    }

    if (startYear) {
      queryUrl += `&begin_date=${startYear}-01` //since input is only month and year, start search at the first day of the month
    }

    if (endYear) {
      queryUrl += `&end_date=${endYear}-27` // end search on the 27th of any month (to avoid problems with searches in the month of February)
    }

    queryUrl += key;

    API.queryArticles(queryUrl)
    .then(results => {

      this.setState({
        results: [...this.state.results, ...results.data.response.docs],
        previousSearch: query,
        searchTerm: '',
        startYear: '',
        endYear: '',
      }, function(){
        this.state.results.length === 0 ? this.setState({noArticles: true}) : this.setState({noArticles: false})
      });
    })
    .catch(err =>
      console.log(err))
    }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let { searchTerm, startYear, endYear } = this.state;
    let query = { searchTerm, startYear, endYear }
    this.getArticles(query)
  };

  moreArticles = () => {
    let { searchTerm, startYear, endYear } = this.state.previousSearch;
    let query = { searchTerm, startYear, endYear }
    let page = this.state.page;
    page++
    this.setState({ page: page}, function (){
      this.getArticles(query)
    });
  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col l={12}>
            <Jumbotron>
            </Jumbotron>
            
            <h4>Search</h4>
            <Form>
              <Row>
                <Col l={12}>
                  <FormGroup>
                    <Label htmlFor="searchTerm">Enter a Keyword:</Label>
                    <Input
                    onChange={this.handleInputChange}
                    name='searchTerm'
                    value={this.state.searchTerm}
                    placeholder='Search'
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col l={6}>
                  <FormGroup>
                    <Label htmlFor="startYear">Start Date (optional):</Label>
                    <Input
                      onChange={this.handleInputChange}
                      type='month'
                      name='startYear'
                      min="1851-01-01" //NYTimes limits to year 1851
                      value={this.state.startYear}
                      placeholder='Start Year'
                    />
                  </FormGroup>
                </Col>
                <Col l={6}>
                  <FormGroup >
                    <Label htmlFor="endYear">End Date (optional):</Label>
                    <Input
                      onChange={this.handleInputChange}
                      type='month'
                      name='endYear'
                      min="1851-01-02"
                      value={this.state.endYear}
                      placeholder='End Year'
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col l={4}>
                  <FormBtn
                    className="submitButton"
                    disabled={!(this.state.searchTerm)}
                    onClick={this.handleFormSubmit}
                    type='info'
                    >Submit
                  </FormBtn>
                </Col>
              </Row>
            </Form>
            </Col>
          </Row>
          <Row>
            <Col l={12}>

            { this.state.noArticles ?
              (<h1>Sorry. No articles here!</h1>) :
              this.state.results.length>0 ? (
                <Row>
                  <CardPanel className="grey darken-1">
                    <h4 className="white-text">Results</h4>

                    {
                      this.state.results.map((article, i) => (
                          <Article
                            key={i}
                            title={article.headline.main}
                            url={article.web_url}
                            synopsis={article.snippet}
                            date={article.pub_date}
                            type='Save'
                            onClick={() => this.saveArticle(article)}
                          />
                        )
                      )
                    }
                    </CardPanel>

                    <div className="moreButton" style={{margin: "0 auto", width: "180px"}}>
                      <FormBtn additional='btn-block' onClick={this.moreArticles}>See More</FormBtn>
                    </div>
                </Row>
              ) : ''
            }
          </Col>
        </Row>

        <Row>
          <Col l={12}>
            <Row>
              <CardPanel className="grey lighten-1" id="savedArticleCard">
                <h4>Saved Articles</h4>
                  {this.state.savedArticles.length > 0 ?
                    (this.state.savedArticles.map((article, i) =>(
                      <Article
                      key = {i}
                      title ={ article.title}
                      url = {article.url}
                      synopsis = {article.synopsis}
                      date = {article.date}
                      type = 'Remove'
                      onClick ={() => this.deleteArticle(article._id)}
                      />
                      )
                      )) : <h1>No saved articles to display</h1>
                    }
              </CardPanel>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}


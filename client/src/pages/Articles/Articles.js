import React, { Component } from "react";
import { Col, Row, Container } from "react-materialize";
import API from "../../utils/API";
import { Article } from "../../components/Article"
import { Panel, PanelHeading, PanelBody } from "../../components/Panel";
import { Form, Input, FormBtn, FormGroup, Label } from "../../components/Form";
import { Card, CardTitle } from "react-materialize";

export default class Articles extends Component {
 
  state = {
    searchTerm: '',
    startYear: '',
    endYear: '',
    page:'0',
    results: [],
    previousSearch: {},
    noneFound: false,
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
      queryUrl += `&begin_date=${startYear}`
    }

    if (endYear) {
      queryUrl += `&end_date=${endYear}`
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
          <Col s={12} className='grid-example'>
          <Card className='small'
            header={<CardTitle image="../public/assets/images/pexels-radio.jpeg">New York Times News Search</CardTitle>}>
            I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
          </Card>
           <Panel>
              <PanelHeading>
                <h3>Search</h3>
              </PanelHeading>
              <PanelBody>
                <Form>
                  <FormGroup>
                    <Label htmlFor="searchTerm">Enter a topic to search for:</Label>
                    <Input
                      onChange={this.handleInputChange}
                      name='searchTerm'
                      value={this.state.searchTerm}
                      placeholder='Topic'
                    />
                  </FormGroup>
                  <FormGroup >
                    <Label htmlFor="startYear">Start Date (optional):</Label>
                    <Input
                      onChange={this.handleInputChange}
                      type='month'
                      name='startYear'
                      value={this.state.startYear}
                      placeholder='Start Year'
                    />
                  </FormGroup>
                  <FormGroup >
                    <Label htmlFor="endYear">End Date (optional):</Label>
                    <Input
                      onChange={this.handleInputChange}
                      type='month'
                      name='endYear'
                      value={this.state.endYear}
                      placeholder='End Year'
                    />
                  </FormGroup>
                  <FormBtn
                    disabled={!(this.state.searchTerm)}
                    onClick={this.handleFormSubmit}
                    type='info'
                    >Submit
                  </FormBtn>
                </Form>
              </PanelBody>
            </Panel>
            { this.state.noArticles ?
              (<h1>Sorry. No articles here!</h1>) :
              this.state.results.length>0 ? (
                <Panel>
                  <PanelHeading>
                    <h3>Results</h3>
                  </PanelHeading>
                  <PanelBody>
                    {
                      this.state.results.map((article, i) => (
                          <Article
                            key={i}
                            title={article.headline.main}
                            url={article.web_url}
                            summary={article.snippet}
                            date={article.pub_date}
                            type='Save'
                            onClick={() => this.saveArticle(article)}
                          />
                        )
                      )
                    }
                      <FormBtn type='warning' additional='btn-block' onClick={this.moreArticles}>More</FormBtn>
                  </PanelBody>
                </Panel>
              ) : ''
            }
          </Col>
        </Row>
      </Container>
    );
  }
}


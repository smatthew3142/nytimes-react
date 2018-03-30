import React, { Component } from "react";
import { Col, Row, Container } from "react-materialize";
import API from "../../utils/API";
import { Article } from "../../components/Article"
import { Panel, PanelHeading, PanelBody } from "../../components/Panel";


export default class SavedArticles extends Component {
	state = {
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

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-10">
						<Panel>
							<PanelHeading>
							<h3>Saved Articles</h3>
							</PanelHeading>
							<PanelBody>
								{this.state.savedArticles.length > 0 ?
									(this.state.savedArticles.map((article, i) =>(
										<Article
										key = {i}
										title ={ article.title}
										url = {article.url}
										synopsis = {article.synopsis}
										date = {article.date}
										type = 'Remove from Saved'
										onClick ={() => this.deleteArticle(article._id)}
										/>
										)
										)) : <h1>No saved articles to display</h1>
									}
							</PanelBody>
						</Panel>
					</Col>
				</Row>
			</Container>
			);
		};
	};
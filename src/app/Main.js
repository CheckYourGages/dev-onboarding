import React, { Component } from 'react';
import { Container, Header, Menu } from 'semantic-ui-react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Intro from './Intro';
import Basics from './Basics';
import Setup from './Setup';
import Kubernetes from './Kubernetes';
import Helm from './Helm';
import Slate from './Slate';

class Main extends Component {

  state = { activeItem: 'intro' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Container textAlign="center" style={{ marginTop: '2em', marginBottom:'1.5em' }}>
          <Header as='h1'>SLATE Application Developer's Tutorial</Header>
          <HashRouter>
            <div>
              <Menu pointing secondary>
                <Menu.Item
                  as={ NavLink }
                  to='/intro'
                  name='intro'
                  active={activeItem === 'intro'}
                  onClick={this.handleItemClick}
                 />
                <Menu.Item
                as={ NavLink } to='/basics'
                  name='background knowledge'
                  active={activeItem === 'background knowledge'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={ NavLink } to='/setup'
                  name='setup your environment'
                  active={activeItem === 'setup your environment'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={ NavLink } to='/kubernetes'
                  name='kubernetes'
                  active={activeItem === 'kubernetes'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={ NavLink } to='/helm'
                  name='helm'
                  active={activeItem === 'helm'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  as={ NavLink } to='/slate'
                  name='SLATE'
                  active={activeItem === 'SLATE'}
                  onClick={this.handleItemClick}
                />
              </Menu>
              <div className="content">
                <Route exact path="/" component={ Intro }/>
                <Route path="/intro" component={ Intro }/>
                <Route path="/basics" component={ Basics }/>
                <Route path="/setup" component={ Setup }/>
                <Route path="/kubernetes" component={ Kubernetes }/>
                <Route path="/helm" component={ Helm }/>
                <Route path="/slate" component={ Slate }/>
              </div>
            </div>
          </HashRouter>

        </Container>
      </div>
    );
  }
}

export default Main;

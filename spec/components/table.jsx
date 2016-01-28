import React from 'react';
import Table from '../../components/table';
import Button from '../../components/button';
import Dropdown from '../../components/dropdown';

/* TODO Other Features
 Sort
 Show / Hide Columns
 */

// Data provide to Dropdown
const allRepos = [
  {
    value: 'react-toolbox',
    label: 'React Toolbox',
  },
  {
    value: 'toolbox-loader',
    label: 'Toolbox Loader',
  },
  {
    value: 'tool-01',
    label: 'Tool 01',
  },
  {
    value: 'tool-02',
    label: 'Tool 02',
  }
];

// Should or not to require provide key props for each item? => if so, add 'key' props to Table
const users = [
  {
    key: 'soyjavi',
    name: 'Javi Jimenez',
    twitter: '@soyjavi',
    birthdate: new Date(1980, 3, 11),
    cats: 1,
    repositories: [
      {
        value: 'react-toolbox'
      },
      {
        value: 'toolbox-loader'
      },
      {
        value: 'tool-01'
      }
    ]
  },
  {
    key: 'javivelasco',
    name: 'Javi Velasco',
    twitter: '@javivelasco',
    birthdate: new Date(1987, 1, 1),
    dogs: 1,
    owner: true,
    repositories: [
      {
        value: 'react-toolbox'
      },
      {
        value: 'toolbox-loader'
      },
      {
        value: 'tool-03'
      }
    ]
  }
];

class TableTest extends React.Component {
  state = {
    selected: [],
    source: users,
    lastMessage: '',
  };

  handleChange = (row, key, value) => {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  };

  handleSelect = (selected) => {
    this.setState({selected});
  };

  handleFavRepoChange(entity, value) {
    const lastMessage = `${entity.key}'s favorite repo is ${value}`;
    this.setState({lastMessage});
  }

  // Should provide type or render method to decide how to render
  // Move into class to use variable this to setState
  UserModel = {
    name: {type: String, header: 'Your Name'},
    twitter: {type: String, header: 'Twitter'},
    birthdate: {type: Date, header: 'Birthday'},
    cats: {type: Number, header: 'Cats'},
    // Change Dog for custom render
    dogs: {
      header: 'Dog',
      render: (entity) => (entity.dogs ? <p>Has {entity.dogs} dogs</p> : 'Has no dogs')
    },
    owner: {type: Boolean},
    repositories: {
      // Should provide whole entity or just entity.repositories?
      header: 'Repositories',
      render: (entity) => (<ul>
        {entity.repositories.map((item, idx) => (<li key={idx}>
          {item.value}
        </li>))}
      </ul>)
    },
    favoriteRepository: {
      header: 'Fav Repo',
      render: (entity) => (<Dropdown auto source={allRepos}
                                     onChange={(value) => this.handleFavRepoChange(entity, value)}/>)
    },
    vote: {
      render: (entity) => (
        <Button icon='bookmark' label={`Bookmark ${entity.name}`}
                onClick={() => alert(`Your Repos are ${entity.repositories.map(item => item.label).join(', ')}`)} raised
                primary/>)
    }
  };

  render() {
    return (
      <section>
        <h5>Table</h5>
        <p style={{marginBottom: '10px'}}>Organized data.</p>
        <p style={{marginBottom: '10px'}}>Last Message: {this.state.lastMessage}</p>
        <Table
          model={this.UserModel}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          selectable
          selected={this.state.selected}
          source={this.state.source}
        />
      </section>
    );
  }
}

export default TableTest;

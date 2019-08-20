import React from 'react';
import TreeList from './component/TreeList';
import { Item } from './interfaces';
import './styles.css';

const App: React.FC = () => {
  let treeData: Item = {
    name: 'My Tree',
    children: [
      { name: 'hello' },
      { name: 'wat' },
      {
        name: 'child folder',
        children: [
          {
            name: 'child folder',
            children: [
              { name: 'hello' },
              { name: 'wat' }]
          },
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child folder',
            children: [
              { name: 'hello' },
              { name: 'wat' }
            ]
          }
        ]
      }
    ]
  }
  return (
    <TreeList
      treeData={treeData}
    />
  );
}


// class App extends React.Component<{}, { text: string }>{
//   constructor(props: {}) {
//     super(props)
//     this.state = { text: 'initl string' }
//     this.handleChange = this.handleChange.bind(this)
//   }
//   handleChange(val: string) {
//     this.setState({ text: val })
//   }
//   render() {
//     return (
//       <EditableLabel
//         text={this.state.text}
//         onChange={this.handleChange}
//       />
//     )
//   }
// }

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { Sketch } from 'politico-style';
import Chart from './Chart';

import '../../scss/styles.scss';

const { Nav, Footer } = Sketch;

const root = document.getElementById('app');

const App = () => (
  <div>
    <Nav appName='module demo' />
    <Chart />
    <Footer />
  </div>
);

ReactDOM.render(<App />, root);

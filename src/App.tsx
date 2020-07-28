import React from 'react';
import './App.css';

import ComposedInput from './ComposedInput';

function App() {
  return (
    <div className="App">
      Use Alt/Option plus Backslash (\) to enter Compose mode.
      <ComposedInput
        textFieldProps={{
          label: 'Try this out'
        }}
      />
    </div>
  );
}

export default App;

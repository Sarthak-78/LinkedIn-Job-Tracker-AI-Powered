import React, { useState } from 'react';
import PreferenceForm from './components/PreferenceForm';
import PreferenceDisplay from './components/PreferenceDisplay';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <>
      <header>
        <h1>Adaptive Job Agent</h1>
      </header>

      <main className="grid-layout">
        <section>
          <PreferenceForm onSave={handleSave} />
        </section>

        <section>
          <PreferenceDisplay refreshTrigger={refreshKey} />
        </section>
      </main>
    </>
  );
}

export default App;

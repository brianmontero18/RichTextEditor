import React from 'react';

const SynonymsContext = React.createContext();

const useSynonyms = () => {
    const context = React.useContext(SynonymsContext);

    if (!context) {
      throw new Error(`useSynonyms must be used within a SynonymsContext`);
    }

    return context;
};

const SynonymsProvider = (props) => {
    const [synonyms, setSynonyms] = React.useState({});
    const getSynonymsByWord = async (word) => {
        try {
            const data = await fetchData(`https://api.datamuse.com/words?rel_syn=${word}&max=5`);
            setSynonyms(data);
        } catch (error) {
            console.error(error);
        }
    };
    const value = React.useMemo(() => [synonyms, getSynonymsByWord], [synonyms])

    return (
        <SynonymsContext.Provider value={value} {...props} />
    );
};

const fetchData = async (url = '') => {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
};

export { SynonymsProvider, useSynonyms };

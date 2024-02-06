import { createContext, useState } from 'react'

export const QueryContext = createContext();

const QueryContextProvider = (props) => {
    let [queryContext, setQueryContext] = useState("");
    let [lecturesToDisplay, setLecturesToDisplay] = useState([]);
    let [pageNumber, setPageNumber] = useState(0);
    let [JSONData, setJSONData] = useState(null);
    let [FINAL_COMBINATIONS, SetFINAL_COMBINATIONS] = useState([]);
    let [finalQuery, setFinalQuery] = useState("");
    let [finalCount, setFinalCount] = useState(0);

    return (
        <QueryContext.Provider
            value={{
                queryContext,
                setQueryContext,
                lecturesToDisplay,
                setLecturesToDisplay,
                pageNumber,
                setPageNumber,
                JSONData,
                setJSONData,
                FINAL_COMBINATIONS,
                SetFINAL_COMBINATIONS,
                finalQuery,
                setFinalQuery,
                finalCount,
                setFinalCount
            }}>
            {props.children}
        </QueryContext.Provider>
    )
}
export default QueryContextProvider;

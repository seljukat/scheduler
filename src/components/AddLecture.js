import { useState, useEffect, useContext, useRef } from 'react'
import { FaShieldCat } from "react-icons/fa6";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { QueryContext } from '../contexts/QueryContext';
import * as XLSX from 'xlsx/xlsx.mjs';
import '../styles/AddLecture.css';

function AddLecture() {

    function upload() {
        setJSONData(null);
        var files = document.getElementById('file_upload').files;
        if (files.length === 0) {
            alert("Please choose any file...");
            return;
        }
        var filename = files[0].name;
        var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
        if (extension === '.XLS' || extension === '.XLSX') {
            excelFileToJSON(files[0]);
        } else {
            alert("Please select a valid excel file.");
        }
    }

    const refButton = useRef(null);

    function applyQuery() {
        setFinalQuery("");
        setFinalQuery(queryContext);

        if (finalCount !== 1) {
            setTimeout(() => {
                refButton.current.click();
            }, 500);
            setFinalCount(1);
        }

        let data = JSONData;
        setJSONData(null);
        setTimeout(() => {
            setJSONData(data);
        }, 10);
    }

    function excelFileToJSON(file) {
        try {
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function (e) {

                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                var result = {};
                workbook.SheetNames.forEach(function (sheetName) {
                    var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if (roa.length > 0) {
                        result[sheetName] = roa;
                    }
                });

                setJSONData(JSON.stringify(result, null, 4));
            }
        } catch (e) {
            console.error(e);
        }
    }

    let [query, setQuery] = useState("");

    let {
        queryContext,
        setQueryContext,
        lecturesToDisplay,
        pageNumber,
        JSONData,
        setJSONData,
        setFinalQuery,
        finalCount,
        setFinalCount
    } = useContext(QueryContext);

    let [finalLecturesList, setFinalLecturesList] = useState([]);

    useEffect(() => {
        let queryValue = null;
        let queryArray = [];
        if (query.at(0) === '"' && query.at(query.length - 1) === '"') {
            queryValue = query.slice(1, query.length - 1);

            if (queryValue.includes(",")) {
                queryArray = queryValue.split(",");
            } else {
                queryArray = Array.from(queryValue);
            }

        }

        let lecturesToProcess = [];
        if (queryArray.length > 1 && query.at(0) === '"' && query.at(query.length - 1) === '"') {
            lecturesToProcess = queryArray;
            setQueryContext(lecturesToProcess);
        }

        const sliceBegin = pageNumber;
        const sliceEnd = sliceBegin + 1;

        setFinalLecturesList(lecturesToDisplay?.slice(sliceBegin, sliceEnd));

    }, [query, pageNumber, JSONData, lecturesToDisplay]);

    return (

        <div className="AddLecture main-grid-item main-grid-item-1">
            <div className="scheduler-search-section">
                <h1 className="scheduler-main-heading">Scheduler</h1>

                <div className='upload-file'>
                    <input type="file" id="file_upload" />
                    <PiPaperPlaneRightFill className='right-arrow' />
                    <button onClick={() => { upload() }}>Upload</button>
                </div>

                <div className="query-bar">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        autoComplete="on"
                        className="input"
                        type="text"
                        id="lectures"
                        placeholder="Lectures"
                    />
                    <label className="label" htmlFor="lectures">
                        Courses
                    </label>

                    <PiPaperPlaneRightFill className='right-arrow' />
                    <button
                        id='buttonToDoubleClick'
                        ref={refButton}
                        onClick={() => { applyQuery(); }}>
                        Apply
                    </button>

                    <div className='query-format-whole-alt'>
                        <h1 className="query-format query-format-heading">Query courses in below format (with quotation):</h1>
                        <h1 className="query-format query-format-alt">Example query: "ABCD 101,EF 102,KLM 103,XY 104"</h1>
                    </div>
                </div>
            </div>

            <div className="scheduler-gap-section"></div>

            <div className="scheduler-lectures-section">
                <div className="lectures">

                    <h1>Courses</h1>

                    <ul className="divide-y divide-gray-200">
                        {finalLecturesList[0]?.map((lecture, index) => {
                            return (
                                <div key={index} className="LectureInfo main-grid-item main-grid-item-2" style={{ "backgroundColor": `${lecture.bgColor}` }}>
                                    <li className="px-3 py-3 flex items-start">
                                        <div className="flex-grow">
                                            <div className="flex items-center">
                                                <span className="flex-none font-medium text-2xl text-blue-500">{lecture.Section}</span>
                                                <div className="flex-none font-medium text-2xl text-blue-500">{lecture.Room?.slice(0, 4) ?? ''}</div>
                                                {lecture.SlicedSchedule?.map((day, index) => {
                                                    return (
                                                        <div key={index}>{day}</div>
                                                    )
                                                })}
                                                <div className="flex-none font-medium text-2xl text-blue-500">{lecture.Lecturer?.replace(/([^\s]+)\s(\S).*/, "$1 $2.")}</div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div className='devs'>
                <span className='dev-container'>
                    Developed by
                </span>
                <div
                    className='dev-link btn btn-primary tooltip dev-a-link'
                >
                    <FaShieldCat className='dev' />
                    <div className="top">
                        <a
                            className='dev-link btn btn-primary tooltip'
                            href='https://github.com/seljukat'
                            target='_blank'
                            rel="noreferrer">

                            <FaGithub />
                        </a>
                        <div className='dev-name'></div>
                        <a
                            className='dev-link btn btn-primary tooltip'
                            href='https://www.linkedin.com/in/sel%C3%A7uk-topkaya/'
                            target='_blank'
                            rel="noreferrer">

                            <FaLinkedin />
                        </a>
                        <i></i>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default AddLecture;
